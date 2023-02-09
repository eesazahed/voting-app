import { DataTypes } from "sequelize";
import sequelize from "./index";

const Vote = sequelize.define("Vote", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  option: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Vote;
