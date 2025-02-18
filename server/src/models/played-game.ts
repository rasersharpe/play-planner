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
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'PlayedGame',
    tableName: 'played_game',
  }
);

PlayedGame.belongsTo(User, { foreignKey: 'userId' });

export default PlayedGame;
