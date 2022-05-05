export default class DbModel {
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
        coordinates: {
          type: this.DataTypes.GEOMETRY("POINT"),
          allowNull: false,
          field: "coordinates",
        },
        streetName: {
          type: this.DataTypes.STRING,
          field: "street_name",
          allowNull: false,
        },
        buildingNo: {
          type: this.DataTypes.INTEGER,
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
  };

  constructor(sequelize) {
    this.sequelize = sequelize;
    this.DataTypes = this.sequelize.Sequelize.DataTypes;
    this._modelUser();
    this._modelOutlet();
  }
}
