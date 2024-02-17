import {DataTypes} from "sequelize"
import {sequelize} from "../db/conexion.js"
import { TypesUser } from "../model/TypesUser.js";

export const UserModel = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
  },{
    timestamps:false
  }
  );
  
  
  TypesUser.hasMany(UserModel, { foreignKey: "typeusers_id" });
UserModel.belongsTo(TypesUser, { foreignKey: "typeusers_id" });
  
  
  