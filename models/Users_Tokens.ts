import { Model, DataTypes } from "sequelize";
import User from "./User";
import { generateDbToken, generateJWTToken } from "./../src/helper/session";
import { BaseContext } from "./../types/Context";
import sequelize from "./../server/index";

export default class Users_Tokens extends Model {
  public id!: number;
  public user_token!: string;
  public user_id!: number;
  public device_ip!: string;
  public device_useragent!: string;

  public static async getNewUserToken(user: User, context: BaseContext, additional_jwt_data?) {
    const token = generateDbToken();

    const device_ip = context.req.ip || "";
    const device_useragent = context.req.headers["user-agent"] || "";

    const userToken: any = await Users_Tokens.create({
      user_token: token,
      user_id: user.id,
      device_ip,
      device_useragent
    });
    if (!userToken) throw new Error("Error in token generation. Please contact admin.");
    return generateJWTToken(token, additional_jwt_data);
  }

  public static async findByUser(user_id: number): Promise<Users_Tokens[]> {
    return await Users_Tokens.findAll({ where: { user_id: user_id } });
  }
}
Users_Tokens.init(
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_token: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.NUMBER,
      references: {model: "users", key: "id"}
    },
    device_ip: {
      type: DataTypes.NUMBER,
    },
    device_useragent: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "users_tokens",
  }
);
