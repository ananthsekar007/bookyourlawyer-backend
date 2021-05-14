import { Model, DataTypes } from "sequelize";
import sequelize from "./../server/index"
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class User extends Model {
  @Field(() => ID)
  public id!: number;
  @Field({ nullable: true })
  public email!: string;
  @Field({ nullable: true })
  public password!: string;
  @Field({ nullable: true })
  public type!: string;

}
User.init(
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);
