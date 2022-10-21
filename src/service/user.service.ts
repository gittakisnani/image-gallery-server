import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import { CreateUserInput } from "../schema/user.schema";

//create user 
export async function createUser(input: CreateUserInput) {
    return await User.create(input)
}

//Get user by userId;
export async function findUser(query: FilterQuery<UserDocument['_id']>) {
    return await User.findById(query).lean().exec();
}

//updateUser
export async function findUserAndUpdate(query: FilterQuery<UserDocument['_id']>, update: UpdateQuery<UserDocument>, options?: QueryOptions) {
    return User.findByIdAndUpdate(query, update, { ...(options && options), new: true })
}

//deleteUser
export async function findUserAndDelete(query: FilterQuery<UserDocument['_id']>) {
    return await User.findByIdAndDelete(query)
}
