import sequelize from "../index.js";
import crypto from "crypto";
import { UserDoor } from "../../auth/crypt.js";

const { room: Room, participant: Participant, user: User } = sequelize.models;
const DEFAULT_TEAM_NO = 1;
const createRoom = async ({ name, creatorId }) => {
  console.log(`[createRoom] room name: ${name} creator: ${creatorId}`);
  if (name === "") {
    throw new Error("Room name must have > 1 character.");
  }
  return Room.create({
    name,
    creatorId,
  });
};

/**
 *
 * @returns {Promise<Boolean>}
 */
const moveParticipantIntoRoom = async ({ participantId, teamNo, roomId }) => {
  return Participant.upsert({ participantId, teamNo, roomId });
};

const whichRoomIsUserIn = async (participantId) => {
  const p = await Participant.findOne({
    where: { participantId },
    attributes: ["roomId"],
  });
  return p ? p.getDataValue("roomId") : null;
};

const participantsOfRoom = async (roomId, conceal = true) => {
  return await Participant.findAll({ where: { roomId } }).then(
    async (rooms) => {
      const result = Promise.all(
        rooms.map(async ({ dataValues }) => {
          const { participantId, roomId } = dataValues;

          const participantName = await getUserNameById(participantId);

          return {
            participantId: conceal
              ? UserDoor.conceal(`${participantId}`)
              : participantId,
            roomId,
            participantName,
          };
        })
      );

      return result;
    }
  );
};

const removeParticipantsOfRoom = async (id) => {
  console.log(`[removeParticipantsOfRoom]`);

  const ps = await participantsOfRoom(id, false);
  const pids = ps.map(({ participantId }) => participantId);

  await Participant.destroy({
    where: {
      participantId: pids,
    },
  });

  return pids;
};

const createAndJoinRoom = async (userId, roomName) => {
  // userId should be plain since caller is server.
  console.log(`[Server createAndJoinRoom ] attempting... creator ${userId}`);
  try {
    const room = await createRoom({ creatorId: userId, name: roomName });

    const roomId = room.getDataValue("id");
    const participantId = userId;
    await moveParticipantIntoRoom({
      participantId,
      teamNo: DEFAULT_TEAM_NO,
      roomId,
    });

    const participantIsInRoom = await whichRoomIsUserIn(participantId);

    console.log(`[participantIsInRoom] in room ${participantIsInRoom}`);
    return participantIsInRoom;
  } catch (err) {
    throw err;
  }
};

const getLineUp = async (id) => {
  console.log(`[getLineUp] ${id}`);
  const roomId = await whichRoomIsUserIn(id);
  if (!roomId) {
    return null;
  }

  return Participant.findAll({
    where: { roomId },
    attributes: ["participantId", "teamNo"],
  });
};

// leaves room and if user is creator, delete room

/**
 *
 * @returns {Number} deleted room id
 */
const leaveRoom = async (userId) => {
  console.log(`[leaveRoom]`);
  const participant = await Participant.findOne({
    where: { participantId: userId },
  });

  if (!participant) {
    return null;
  }
  const fromRoomId = participant.getDataValue("roomId");
  const participantId = participant.getDataValue("participantId");

  const roomDetails = await Room.findOne({ where: { id: fromRoomId } });

  const creatorId = roomDetails.getDataValue("creatorId");
  // op
  console.log(`[leaveRoom] ${participantId}`);

  if (participantId === creatorId) {
    const pids = await removeParticipantsOfRoom(fromRoomId);

    await Room.destroy({ where: { id: fromRoomId } });

    return [fromRoomId, pids];
  } else {
    await Participant.destroy({ where: { participantId } });
    return [fromRoomId, [participantId]];
  }
};

const getUserNameById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user.getDataValue("username");
};

const getRoomData = async (roomId) => {
  const { dataValues } = await Room.findOne({ id: roomId });
  const { id, creatorId, name } = dataValues;
  const username = await getUserNameById(creatorId);
  return {
    id,
    creatorId: UserDoor.conceal(`${creatorId}`),
    name,
    creatorName: username,
  };
};
const getAllRooms = async () => {
  return await Room.findAll().then(async (rooms) => {
    const result = Promise.all(
      rooms.map(async ({ dataValues }) => {
        const { id, creatorId, name } = dataValues;

        const username = await getUserNameById(creatorId);

        return {
          id,
          creatorId: UserDoor.conceal(`${creatorId}`),
          name,
          creatorName: username,
        };
      })
    );

    return result;
  });
};
export {
  createAndJoinRoom,
  whichRoomIsUserIn,
  getLineUp,
  leaveRoom,
  getAllRooms,
  getRoomData,
};
