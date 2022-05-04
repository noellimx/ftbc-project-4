import { Sequelize } from "sequelize";
import DbModel from "./models/index.js";
import newDbApi from "./api/index.js";




// Enforces Model Initialization via inheritance.
class InitDatabase extends DbModel {

  _seed = async () => {
    const username = "1";
    const password = "1";
    await this.dbApi.registerUser({username, plainPassword: password, password2: password })
  }
  constructor(sequelize) {
    super(sequelize);
    // Initialize
    this.sequelize = sequelize;
    this.dbApi = newDbApi(this.sequelize);


    
  }

  wipe = async () => {
    for (const models of Object.values(this.sequelize.models)) {
      await models.destroy({ where: {} });
    }
  };

  close = () => this.sequelize.close();
  seed = this._seed;
}

/**
 *
 * @param {Sequelize} sequelize
 * @returns
 */
export const initDatabase = (sequelize) => {
  return new InitDatabase(sequelize);
};

export default initDatabase;
