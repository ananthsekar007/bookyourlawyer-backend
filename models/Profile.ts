import { Model, DataTypes } from "sequelize";
import sequelize from "./../server/index"
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class Profile extends Model {
  @Field(() => ID)
  public id!: number; 
  @Field({ nullable: true })
  public user_id!: number; 
  @Field({ nullable: true })
  public email!: string; 
  @Field({ nullable: true })
  public password!: string;
  @Field({nullable: true})
  public name!: string; 
  @Field({nullable: true})
  public district!: string; 
  @Field({nullable: true})
  public state!: string; 
  @Field({nullable: true})
  public govt_id!: string;
  @Field({nullable: true})
  public case_type!: 'CRIMINAL' | 'CIVIL' | 'BOTH'; 
  @Field({nullable: true})
  public phone_number!: number; 
}
Profile.init(
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER
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
    district: {
      type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    govt_id: {
        type: DataTypes.STRING,
    },    
    case_type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "profile",
  }
);
