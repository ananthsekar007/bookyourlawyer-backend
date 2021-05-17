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
  import {Profile, Users_Tokens, User, Lawyers ,Clients} from "./../../models/index";
  import {validateUser} from "./../middleware/validateUser"
import { query } from "express";

@ObjectType()
class ProfileResponse {
  @Field({ nullable: true })
  profile?: Profile;
}

@InputType()
class ProfileInput {
  @Field()
  email: string;
  @Field()
  case_type: 'CRIMINAL' | 'CIVIL' | 'BOTH';
  @Field()
  phone_number: number;
  @Field()
  name: string;
  @Field()
  district: string;
  @Field()
  state: string;
  @Field()
  govt_id: string;
}

@Resolver()
export class ProfileResolver {
    @UseMiddleware(validateUser)
    @Query(() => Profile)
    async profile_get(@Ctx() context: Context) {
        console.log("user_id---------------------------------------------------", context.user)
        let profile = await Profile.findOne({
            where: {
                user_id: context.user.id
            }
        })
       
        return {profile};
    }

    @UseMiddleware(validateUser)
    @Mutation(() => ProfileResponse)
    async Profile(
        @Arg("input", {validate: true}) profileInput: ProfileInput,
        @Ctx() context: Context
    ) {
        const profile = await Profile.findOne({
            where: {
                email: profileInput.email
            }
        })
        return {profile};
    }
}