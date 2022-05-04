
import { hashPassword, newAccessToken } from "../../auth/crypt.js";

const newDbAuthApi = (sequelize) => {
  const { user: User } = sequelize.models;

  const createUser = async (username, plainPassword) => {
    const user = await User.create({
      username,
      password: hashPassword(plainPassword),
    });

    return user;
  };

  const getUserByUsername = async (username) =>
    await User.findOne({ where: { username } });

  const isUserExistingByUsername = async (username) =>
    !!(await getUserByUsername(username));

  const registerUser = async ({ username, plainPassword, password2 }) => {
    const is = await isUserExistingByUsername(username);
    if (is) {
      return [null, "Username taken :("];
    }
    if (plainPassword !== password2) {
      return [null, "Confirmation password mismatch."];
    }
    if (!username) {
      return [null, "Username must have at least 1 character"];
    }
    if (!plainPassword || !password2) {
      return [null, "Password must have at least 1 character"];
    }

    const user = await createUser(username, plainPassword);

    const usernameRetrieved = user.getDataValue("username");
    return [usernameRetrieved, `Registration Success: ${usernameRetrieved} `];
  };

  const getAccessToken = async ({ username, password: clearPassword }) => {
    if (!username) {
      return {
        securityToken: null,
        msg: "User field should not be empty :(",
      };
    }
    const details = await getUserByUsername(username);
    if (!details) {
      return {
        securityToken: null,
        msg: "User not found.",
      };
    }
    const passwordReceivedHashed = hashPassword(clearPassword);
    const passwordDatabaseHashed = details.getDataValue("password");

    const user_id = details.getDataValue("id");
    const isMatch = passwordReceivedHashed === passwordDatabaseHashed;

    const userId = isMatch ? user_id : null;
    const msg = isMatch ? "ok" : "Credentials mismatch.";

    const accessToken = newAccessToken({ sub: userId, msg
});
    return {accessToken, msg};
  };


  return {
    registerUser, getAccessToken
  };
};

export default newDbAuthApi;