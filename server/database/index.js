import initModels from "./models/init/index.js";

const newDbApi = (sequelize) => {
  const { user: User } = sequelize.models;

  const getUserByUsername = async (username) =>
    await User.findOne({ where: { username } });

  const isUserExistingByUsername = async (username) =>
    !!(await getUserByUsername(username));

  const addUser = async ({ username, password, password2 }) => {
    const is = await isUserExistingByUsername(username);
    if (is) {
      return [null, "Username taken :("];
    }
    if (password !== password2) {
      return [null, "Confirmation password mismatch."];
    }
    if (!username) {
      return [null, "Username must have at least 1 character"];
    }
    if (!password || !password2) {
      return [null, "Password must have at least 1 character"];
    }

    const user = await createUser(username, password);

    const usernameRetrieved = user.getDataValue("username");
    return [usernameRetrieved, `Registration Success: ${usernameRetrieved} `];
  };

  return {
    addUser,
  };
};

export const initDatabase = (sequelize) => {
  initModels(sequelize);

  const dbApi = newDbApi(sequelize);
  console.log(`Connected. Database Name: ${sequelize.getDatabaseName()}`);

  const wipe = async () => {
    for (const models of Object.values(sequelize.models)) {
      await models.destroy({ where: {} });
    }
  };

  const close = () => sequelize.close();

  const seed = () => {};
  return {
    wipe,
    close,
    seed,
  };
};

export default initDatabase;
