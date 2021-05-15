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
  @Field({nullable: true})
  public name!: string;
  @Field({nullable: true})
  public phone_number!: number;
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
    name: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.BIGINT,
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
