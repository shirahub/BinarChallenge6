"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  UserBiodata.init(
    {
      userId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserBiodata",
      tableName: "user_biodata",
      underscored: true,
      freezeTableName: true,
    }
  );
  return UserBiodata;
};
