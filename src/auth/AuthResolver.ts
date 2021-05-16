import User from "./../../models/User";
import { Resolver, ObjectType, Field, Mutation, Arg, Query, Ctx, UseMiddleware, InputType } from "type-graphql";
import { Context } from "./../../types/Context";
import { comparePassword } from "./../helper/helper";
import Users_Tokens from "./../../models/Users_Tokens";

// import { extractAuthToken } from "./helper/session";
// import { JWT_SECRET_TOKEN } from "./config/token";

@ObjectType()
class AuthResponse {
  @Field()
  token: string;

  @Field({ nullable: true })
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
  
  @Mutation(() => AuthResponse)
  async login(@Arg("input", {validate: true}) loginInput: LoginInput, @Ctx() context: Context ) {
    const user = await User.findOne({
      where: {
        email: loginInput.email
      }
    });

    if (!user) throw new Error("Invalid username or password");

    if (comparePassword(loginInput.password, user.password)) {
      const token: string = await Users_Tokens.getNewUserToken(user, context);

      return { token, user };
    } else {
      throw new Error("Invalid username or password");
    }
  }
}