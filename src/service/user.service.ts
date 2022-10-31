import { omit } from "lodash";
import { FilterQuery, FlattenMaps, LeanDocument, QueryOptions, UpdateQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import { CreateSessionInput } from "../schema/session.schema";
import { CreateUserInput } from "../schema/user.schema";

export const privateFields = ['__v', 'password']


//create user 
export async function createUser(input: CreateUserInput) {
    return User.create(input)
}

//Get user by userId;
export async function findUser(query: string) {
    return User.findById(query).exec();
}

//updateUser
export async function findUserAndUpdate(query: string, update: UpdateQuery<UserDocument>, options?: QueryOptions) {
    return User.findByIdAndUpdate(query, update, { ...(options && options), new: true })
}

//deleteUser
export async function findUserAndDelete(query: string) {
    return User.findByIdAndDelete(query)
}

interface IncorrectPwd {
    error: true
    message: string
}

export async function validatePassword({ email, password }: CreateSessionInput) : Promise<IncorrectPwd | UserDocument>  {
    const user = await User.findOne({ email }).exec();
    if(!user) return { error: true, message: 'User not found'}

    const valid = await user.comparePassword(password);
    if(!valid) return { error: true, message: 'Invalid credentials'}

    return user
}
