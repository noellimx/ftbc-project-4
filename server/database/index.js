import { Sequelize } from "sequelize";
import DbModel from "./models/index.js";
import newDbAuthApi from "./api/auth.js";
import newDbLocationApi from "./api/location.js";

// Enforces Model Initialization via inheritance.


const dummyOutlet = ({ coordinates, address, name }) => ({ coordinates, ...address, name })
export class Database extends DbModel {
  _seed = async () => {
    console.log(`                                     [_Seeding]`)
    console.log()
    console.log()
    console.log()
    /** Users */
    const username = "u";
    const password = "u";
    console.log(await this.auth.registerUser({
      username,
      plainPassword: password,
      password2: password,
    }))


    /** Outlets */

    const outlet1 = dummyOutlet({ coordinates:{
      type: "Point",
     
      coordinates:  [1.3189760741954744, 103.81554719080732],
    }, address:  {
      streetName: "Cluny Park Road",
      buildingNo: 50,
      postalCode: 257488,
    }, name: "business" })


        const outlet_up_1 = dummyOutlet({ coordinates:{
      type: "Point",
      coordinates: [1.353664975577646, 103.83431850981404],
    }, address:  {
      streetName: "Upper Thomson Road",
      buildingNo: "246M",
      postalCode: 574370,
    }, name: "lotiplatahaus" })



    
    const outlet_up_2_200 = dummyOutlet({ coordinates:{
      type: "Point",
      coordinates: [1.3553734436534264, 103.83637998117607],
    }, address:  {
      streetName: "Upper Thomson Road",
      buildingNo: "244P",
      postalCode: 574369,
    }, name: "beachroadscissorcut" })



    const outlet_up_3_400 = dummyOutlet({ coordinates:{
      type: "Point",
      coordinates: [1.3553734436534264, 103.83637998117607],
    }, address:  {
      streetName: "Sin Ming Road",
      buildingNo: "24",
      postalCode: 570024,
    }, name: "sinminglotiplata" })



    for await(const _outlet of [outlet_up_1,outlet_up_2_200,outlet_up_3_400] ){
      const outlet = await this.location.createOutlet(_outlet);

    }


    const outlet = await this.location.createOutlet(outlet1);


    const outletId = outlet.getDataValue("id")
    await this.location.addOutletToDistrict({nearbyOutletId: outletId, name: "district-51"})


    console.log()
    console.log()
    console.log()

    console.log(`End                                     [_Seeding]`)
    console.log()
    console.log()
    console.log()




  };
  constructor(sequelize) {
    super(sequelize);
    // Initialize
    this.sequelize = sequelize;
    console.log(`[Database]`);
    console.log(this.sequelize.models);

    const { outlet: Outlet, district:District , user:User} = this.sequelize.models;

    this.Outlet = Outlet;
    this.District = District;
    this.User = User
    this.location = newDbLocationApi(this.Outlet,this.District);
    this.auth = newDbAuthApi(this.sequelize);



  }

  wipe = async () => {


    for await( const model of [this.District,this.Outlet, this.User]){
      await model.destroy({where : {}})
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
