import { Model, DataTypes, INTEGER } from "sequelize";
import sequelize from "./../server/index"
import { ObjectType, Field, ID } from "type-graphql";
import User from "./User";
@ObjectType()
export default class Client extends Model {
  @Field(() => ID)
  public id!: number;
  @Field({ nullable: true })
  public user_id!: number;
}
Client.init(
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
    tableName: "clients",
  }
);

User.belongsTo(User, {foreignKey: "user_id"});