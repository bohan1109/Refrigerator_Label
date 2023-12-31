'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LabelPrinters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  LabelPrinters.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LabelPrinters',
  });
  return LabelPrinters;
};