import { Request } from "express";
import User from "./../models/User";

type BaseContext = {
    req: Request;
}

type UserContext = {
    user?: User;
    decodedJwt?: any;
}

type Context =   BaseContext & UserContext;

export {Context, BaseContext, UserContext}