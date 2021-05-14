import User from "./../../models/User";
import { Resolver, ObjectType, Field, Mutation, Arg, Query, Ctx, UseMiddleware, InputType } from "type-graphql";
import { Context } from "./../../types/Context";

// import { extractAuthToken } from "./helper/session";
// import { JWT_SECRET_TOKEN } from "./config/token";

@ObjectType()
class LoginResponse {
  @Field()
  token: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class AuthResolver {
    @Query(() => User)
    async user_get(@Ctx() context: Context) {
    return context.req;
  }
}