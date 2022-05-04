
import { hashPassword } from "../../auth/crypt.js";

const newDbApi = (sequelize) => {
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

  return {
    registerUser,
  };
};

export default newDbApi;