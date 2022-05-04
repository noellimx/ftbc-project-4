import { Sequelize } from "sequelize";
import DbModel from "./models/index.js";
import newDbAuthApi from "./api/index.js";




// Enforces Model Initialization via inheritance.
export class Database extends DbModel {

  _seed = async () => {
    const username = "1";
    const password = "1";
    await this.auth.registerUser({username, plainPassword: password, password2: password })
  }
  constructor(sequelize) {
    super(sequelize);
    // Initialize
    this.sequelize = sequelize;
  }

  wipe = async () => {
    for (const models of Object.values(this.sequelize.models)) {
      await models.destroy({ where: {} });
    }
  };
  seed = this._seed;
  close = () => this.sequelize.close();


  auth = newDbAuthApi(this.sequelize);
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
