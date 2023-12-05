"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parks extends Model {
    static associate(models) {
      Parks.hasMany(models.Favorites);
    }
  }
  Parks.init(
    {
      googleId: DataTypes.STRING,
      name: DataTypes.STRING,
      rating: DataTypes.STRING,
      address: DataTypes.TEXT,
      imageUrl: DataTypes.TEXT,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Park",
    }
  );
  return Parks;
};
