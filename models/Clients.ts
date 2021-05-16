import { Model, DataTypes, INTEGER } from "sequelize";
import sequelize from "./../server/index"
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class User extends Model {
  @Field(() => ID)
  public id!: number;
  @Field({ nullable: true })
  public user_id!: number;
}
User.init(
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
