import { Model, DataTypes, INTEGER } from "sequelize";
import sequelize from "./../server/index"
import { ObjectType, Field, ID } from "type-graphql";
import User from "./User";
 
@ObjectType()
export default class Laywer extends Model {
  @Field(() => ID)
  public id!: number;
  @Field({ nullable: true })
  public user_id!: number;
}
Laywer.init(
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {model: "users", key: "id"}
    },
  },
  {
    sequelize,
    tableName: "lawyers",
  },

);

Laywer.belongsTo(User, {foreignKey: "id"});