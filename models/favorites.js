"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    static associate(models) {
      // Favorites.belongsTo(models.User, { foreignKey: "userId" });
      //   Favorites.hasMany(models.Park);
    }
  }
  Favorites.init(
    {
      userId: DataTypes.INTEGER,
      parkId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favorites",
    }
  );
  return Favorites;
};
