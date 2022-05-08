export default class DbModel {
  _modelDistrict = () => {
    const _model = this.sequelize.define(
      "district",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: this.DataTypes.INTEGER,
          field: "id",
        },
        createdAt: {
          allowNull: false,
          type: this.DataTypes.DATE,
          field: "created_at",
        },
        updatedAt: {
          allowNull: false,
          type: this.DataTypes.DATE,
          field: "updated_at",
        },
        name: {
          type: this.DataTypes.STRING,
          allowNull: false,
          field: "name",
        },
        nearbyOutletId: {
          type: this.DataTypes.INTEGER,
          references: {
            model: this.User,
            key: "id",
          },
          allowNull: false,
          field: "nearby_outlet_id",
        },
      },
      {
        underscored: true,
      }
    );
    if (_model !== this.sequelize.models.district) {
      throw new Error("model reference mismatch");
    }
    console.log(`[DbModel] _modelOutlet`);
  };

  _modelOutlet = () => {
    const _model = this.sequelize.define(
      "outlet",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: this.DataTypes.INTEGER,
          field: "id",
        },
        createdAt: {
          allowNull: false,
          type: this.DataTypes.DATE,
          field: "created_at",
        },
        updatedAt: {
          allowNull: false,
          type: this.DataTypes.DATE,
          field: "updated_at",
        },
        coordinates: {
          type: this.DataTypes.GEOMETRY("POINT", 4326),
          allowNull: false,
          field: "coordinates",
        },
        streetName: {
          type: this.DataTypes.STRING,
          field: "street_name",
          allowNull: false,
        },
        buildingNo: {
          type: this.DataTypes.STRING,
          field: "building_no",
          allowNull: false,
        },
        postalCode: {
          field: "postal_code",
          type: this.DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: this.DataTypes.STRING,
          allowNull: false,
          field: "name",
        },
      },
      {
        underscored: true,
      }
    );
    if (_model !== this.sequelize.models.outlet) {
      throw new Error("model reference mismatch");
    }
    console.log(`[DbModel] _modelOutlet`);

    return _model;
  };

  _modelUser = () => {
    const userModel = this.sequelize.define(
      "user",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: this.DataTypes.INTEGER,
          field: "id",
        },
        createdAt: {
          allowNull: false,
          type: this.DataTypes.DATE,
          field: "created_at",
        },
        updatedAt: {
          allowNull: false,
          type: this.DataTypes.DATE,
          field: "updated_at",
        },
        username: {
          type: this.DataTypes.STRING,
          allowNull: false,
          field: "username",
        },
        password: {
          type: this.DataTypes.STRING,
          allowNull: false,
          field: "password",
        },
        credit: {
          type: this.DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          field: "credit",
        },
      },
      {
        underscored: true,
      }
    );
    if (userModel !== this.sequelize.models.user) {
      throw new Error("model reference mismatch");
    }
    console.log(`[DbModel] _modelUser`);

    return userModel;
  };

  constructor(sequelize) {
    this.sequelize = sequelize;
    this.Sequelize = this.sequelize.Sequelize;
    this.DataTypes = this.Sequelize.DataTypes;
    this.User = this._modelUser();
    this.Outlet = this._modelOutlet();
    this.District = this._modelDistrict();
  }
}
