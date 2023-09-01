"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
