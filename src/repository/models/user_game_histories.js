"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User);
    }
  }
  UserGameHistory.init(
    {
      userId: DataTypes.INTEGER,
      timeSeconds: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserGameHistory",
      tableName: "user_game_histories",
    }
  );
  return UserGameHistory;
};
