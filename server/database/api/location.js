const newDbLocationApi = (Outlet) => {
  if (!Outlet) {
    throw new Error("A connected sequelize model is required");
  }
  const createOutlet = async (outlet) => {
    await Outlet.create(outlet);
  };
  return {
    createOutlet,
  };
};

export default newDbLocationApi;
