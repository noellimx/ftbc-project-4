import initModelUser from "./user.js";

const initModels = (sequelize) => {
  const User = initModelUser(sequelize);
  return sequelize;
};

export default initModels;
