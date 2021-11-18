'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FoodPost.belongsTo(models.User)
    }
  };
  FoodPost.init({
    foodName: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    UserId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FoodPost',
  });
  return FoodPost;
};