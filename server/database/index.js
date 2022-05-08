import { Sequelize } from "sequelize";
import DbModel from "./models/index.js";
import newDbAuthApi from "./api/auth.js";
import newDbLocationApi from "./api/location.js";

// Enforces Model Initialization via inheritance.
export class Database extends DbModel {
  _seed = async () => {
    console.log(`[_Seeding]`)
    const username = "u";
    const password = "u";
    console.log(await this.auth.registerUser({
      username,
      plainPassword: password,
      password2: password,
    }))

    const coordinates = {
      type: "Point",
      coordinates: [1.29027, 103.851959],
    };
    const address = {
      streetName: "Lucki Lane",
      buildingNo: 88,
      postalCode: 729826,
    };
    const name = "holybee";

    await this.location.createOutlet({ coordinates, ...address, name });
  };
  constructor(sequelize) {
    super(sequelize);
    // Initialize
    this.sequelize = sequelize;
    console.log(`[Database]`);
    console.log(this.sequelize.models);

    const { outlet: Outlet } = this.sequelize.models;

    this.Outlet = Outlet;

    this.location = newDbLocationApi(this.Outlet);
    this.auth = newDbAuthApi(this.sequelize);
  }

  wipe = async () => {
    for (const models of Object.values(this.sequelize.models)) {
      await models.destroy({ where: {} });
    }
  };
  seed = this._seed;
  close = () => this.sequelize.close();
}

/**
 *
 * @param {Sequelize} sequelize
 * @returns {Database}
 */
export const initDatabase = (sequelize) => {
  return new Database(sequelize);
};

export default initDatabase;
