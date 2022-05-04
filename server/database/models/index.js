
export default class DbModel {
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
  }
}