const newDbLocationApi = (Outlet, District) => {
  if (!Outlet || !District) {
    throw new Error("A connected sequelize model is required");
  }
  const createOutlet = async (outlet) => {
    return await Outlet.create(outlet);
  };

  const addOutletToDistrict = async ({nearbyOutletId, name}) => {
    return await District.create({nearbyOutletId, name })
  }
  return {
    createOutlet,addOutletToDistrict
  };
};

export default newDbLocationApi;
