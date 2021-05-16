import { MiddlewareFn } from "type-graphql";
import { UserContext, BaseContext } from "./../../types/Context";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET_TOKEN } from "../config/token";
import User from "./../../models/User";
import Users_Tokens from "./../../models/Users_Tokens";
import { extractAuthToken } from "../helper/session";

export const validateUser: MiddlewareFn<UserContext & BaseContext> = async ({ context }, next) => {
  const token = extractAuthToken(context);
  context.user = await validateToken(token);
  context.decodedJwt = decodeToken(token);
  return next();
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export const validateToken = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_TOKEN, async (err: any, decoded: any) => {
      if (err) {
        return reject(new Error("Session Expired. Please logout and re-login"));
      }
      const userToken = await Users_Tokens.findOne({
        where: { user_token: decoded.token },
      });
      if (!userToken) return reject(new Error("Invalid user token. Please logout and re-login."));
      const userDb = await User.findOne({ where: { id: userToken.user_id } });
      if (!userDb) return reject(new Error("Invalid user token. Please logout and re-login."));
      return resolve(userDb);
    });
  });
};
