import initModels from "./models/init/index.js";

export const initDatabase = (sequelize) => {
  initModels(sequelize);
  console.log(`Connected. Database Name: ${sequelize.getDatabaseName()}`);

  const wipe = async () => {
    for (const models of Object.values(sequelize.models)) {
      await models.destroy({ where: {} });
    }
  };

  const close = () => sequelize.close();

  return {
    wipe,
    close,
  };
};

export default initDatabase;
