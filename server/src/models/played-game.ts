import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js'; 
import { User } from './user.js'; 

export class PlayedGame extends Model {}

PlayedGame.init(
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
    }
  },
  {
    sequelize,
    modelName: 'PlayedGame',
    tableName: 'played_game',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'gameId'],  // Ensure that the user can't add the same game multiple times
      },
    ],
  }
);

PlayedGame.belongsTo(User, { foreignKey: 'userId' });

export default PlayedGame;
