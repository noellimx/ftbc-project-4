const newDbLocationApi = (Outlet, District, Sequelize) => {
  if (!Outlet || !District) {
    throw new Error("A connected sequelize model is required");
  }
  const createOutlet = async (outlet) => {
    return await Outlet.create(outlet);
  };

  const addOutletToDistrict = async ({ nearbyOutletId, name }) => {
    return await District.create({ nearbyOutletId, name });
  };

  const getNearbyOutlets = async ({ center, distanceM }) => {
    const [latitude, longitude] = center;
    const location2 = Sequelize.literal(
      `ST_GeomFromText('POINT(${longitude} ${latitude})',4326)::geography`
    );
    const targetLocation2 = Sequelize.literal(`"coordinates"::geography`);
    const distStmt2 = Sequelize.fn("ST_Distance", targetLocation2, location2);

    const nbs = await Outlet.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn(
              "ST_Distance",
              Sequelize.col("coordinates"),
              Sequelize.fn(
                "ST_SetSRID",
                Sequelize.fn("ST_MakePoint", longitude, latitude),
                "4326"
              )
            ),
            "distance",
          ],
          [distStmt2, "convertedDistance"],
        ],
      },
      where: Sequelize.fn(
        "ST_DWithin",
        Sequelize.col("coordinates"),
        Sequelize.fn(
          "ST_SetSRID",
          Sequelize.fn("ST_MakePoint", longitude, latitude),
          "4326"
        ),
        distanceM
      ),
      order: Sequelize.literal("distance ASC"),
    });

    return nbs;
  };

  const getDistancesOfOutlets = async ({ center }) => {
    const [latitude, longitude] = center;
    const location2 = Sequelize.literal(
      `ST_GeomFromText('POINT(${longitude} ${latitude})',4326)::geography`
    );
    const targetLocation2 = Sequelize.literal(`"coordinates"::geography`);
    const distStmt2 = Sequelize.fn("ST_Distance", targetLocation2, location2);
    const nbs = await Outlet.findAll({
      attributes: {
        include: [[distStmt2, "distance2"]],
      },
      where: {},
    });

    return nbs;
  };

  return {
    createOutlet,
    addOutletToDistrict,
    getNearbyOutlets,
    getDistancesOfOutlets,
  };
};

export default newDbLocationApi;
