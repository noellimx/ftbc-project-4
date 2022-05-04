import sequelize from "../../database/index.js";

const getUserById = async (id) => await User.findOne({ where: { id } });

const isUserExisting = async (id) => {
  const user = await getUserById(id);
  console.log(`[isUserExisting] is? ${!!user}`);
  return user;
};

export {
  getUserByUsername,
  isUserExisting,
  isUserExistingByUsername,
  createUser,
};
