import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js'; 
import { User } from './user.js';

export class WishList extends Model {}

WishList.init(
  {
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
    },
    description_raw: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'WishList',
    tableName: 'wish_list',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'gameId'],  // Ensure that the user can't add the same game multiple times
      },
    ],
  }
);

WishList.belongsTo(User, { foreignKey: 'userId' });

export default WishList;
