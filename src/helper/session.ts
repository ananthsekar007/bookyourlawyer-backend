import * as jwt from "jsonwebtoken";
import User from "./../../models/User";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "./../handler/index";
import * as uuid from "uuid";
import { BaseContext } from "./../../types/Context";
import { JWT_SECRET_TOKEN } from "./../config/token";

export const generateDbToken = () => {
  return uuid.v1() + "-bookyourlawyer-" + uuid.v4() + Math.random();
};

export const generateJWTToken = (token: string, additional_jwt_data?): string => {
  return jwt.sign(
    {
      token,
      ...additional_jwt_data,
    },
    JWT_SECRET_TOKEN
  );
};

export const extractAuthToken = (context: BaseContext): string => {
  const authorization = context.req.headers.authorization || "";
  return authorization.split(" ")[1];
};

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET_TOKEN, async (err: any, user: User) => {
      if (err) {
        console.log("Error", err);
        return ErrorHandler.response(res, 401, "Unauthorised", null);
      }
      try {
        const userDb = await User.findOne({ where: { id: user.id } });
        res.locals.user = userDb;
        next();
      } catch (e) {
        ErrorHandler.response(res, 401, "Unauthorised", e);
      }
    });
  } else {
    ErrorHandler.response(res, 401, "Unauthorised", null);
  }
};

export const getJwtToken = (info): string => {
  return jwt.sign(
    {
      ...info,
    },
    JWT_SECRET_TOKEN
  );
};
