import {
  Resolver,
  ObjectType,
  Field,
  Mutation,
  Arg,
  Query,
  Ctx,
  UseMiddleware,
  InputType,
} from "type-graphql";
import { Context, BaseContext } from "./../../types/Context";
import { comparePassword, getHashOfPassword } from "./../helper/helper";
import {Profile, Users_Tokens, User, Lawyers ,Clients} from "./../../models/index";

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
class RegisterInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  category: "LAWYER" | "CLIENT";
  @Field()
  phone_number: number;
  @Field()
  name: string;
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
  async login(
    @Arg("input", { validate: true }) loginInput: LoginInput,
    @Ctx() context: Context
  ) {
    const user = await User.findOne({
      where: {
        email: loginInput.email,
      },
    });

    if (!user) throw new Error("Invalid username or password");

    if (comparePassword(loginInput.password, user.password)) {
      const token: string = await Users_Tokens.getNewUserToken(user, context);

      return { token, user };
    } else {
      throw new Error("Invalid username or password");
    }
  }

  @Mutation(() => AuthResponse)
  async register(
    @Arg("input", { validate: true }) registerInput: RegisterInput,
    @Ctx() context: BaseContext,
    is_active: boolean = true
  ) {
    let user = await User.findOne({
      where: { email: registerInput.email },
    });
    if (user) {
      throw new Error("User already exist with same email");
    }
    user = await User.create({
      ...registerInput,
      type: registerInput.category,
      password: getHashOfPassword(registerInput.password),
    });

    let profile = await Profile.create({
      email: registerInput.email,
      user_id: user.id,
      phone_number: registerInput.phone_number,
      name: registerInput.name,
    });

    if(registerInput.category === "CLIENT") {
      let user_type = await Clients.create({
        user_id: user.id
      });
    }
    else {
      let user_type = await Lawyers.create({
        user_id: user.id
      });
    }

    if (profile && user) {
      console.log({profile});
      const token: string = await Users_Tokens.getNewUserToken(user, context);
      return {
        token: token,
        user,
      };
    }
  }
}
