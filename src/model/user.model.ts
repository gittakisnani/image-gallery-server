import mongoose from "mongoose";
import { UpdateUserInput } from "../schema/user.schema";
import argon2 from "argon2";


export interface UserDocument extends mongoose.Document, Required<UpdateUserInput['body']> {
    createdAt: Date,
    updatedAt: Date,
    comparePassword: (candidatePwd: string) => Promise<Boolean>;
}   

const userSchema = new mongoose.Schema(
    {
        firstName: {
            required: true,
            type: String
        },
        lastName: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        },
        password: {
            required: true,
            type: String
        },
        picture: {
            type: String,
            default: 'https://images.unsplash.com/photo-1662581871665-f299ba8ace07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80'
        },
        bio: {
            type: String,
        },
        twitter: {
            type: String,
        },
        instagram: {
            type: String,
        },
        yt: {
            type: String,
        },
        tiktok: {
            type: String,
        },
        website: {
            type: String
        },
        location: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    const user = this as UserDocument;
    if(!this.isModified('password') || !this.isDirectModified('password')) {
        return next()
    }

    const hashedPwd = await argon2.hash(this.password)


    this.password = hashedPwd;

    next()
})

userSchema.methods.comparePassword = async function (candidatePwd: string) {
    const user = this as UserDocument;
    return await argon2.verify(user.password, candidatePwd).catch(err => false)
}

const User = mongoose.model<UserDocument>('User', userSchema)

export default User;
