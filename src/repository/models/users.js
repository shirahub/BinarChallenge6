"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.UserBiodata, {
        as: "userBiodata",
        tableName: "user_biodata",
        foreignKey: "userId",
      });
      this.hasMany(models.UserGameHistory);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      freezeTableName: true,
    }
  );
  return User;
};
