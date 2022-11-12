import { Request, Response } from "express";
import { omit } from "lodash";
import { UserDocument } from "../model/user.model";
import { CreateUserInput, DeleteUserInput, FollowUserInput, GetUserInput, UpdateUserInput } from "../schema/user.schema";
import { createUser, findUser, findUserAndDelete, findUserAndUpdate, privateFields } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    try {
        const user = await createUser(req.body);
        res.status(201).json(omit(user.toJSON(), privateFields))
    } catch(err: any) {
        if(err?.code === 11000) {
            res.status(403).json({ message: 'You cannot use already registered email'})
        } else {
            res.status(500).json({ message: 'Cannot register'})
        }
    }
}

export async function findUserHandler(req: Request<GetUserInput>, res: Response) {
    try {
        const user = await findUser(req.params.userId);
        res.json(omit(user, privateFields))
    } catch(err) {
        logger.error(err);
        res.status(400).json(err)
    }
}

export async function updateUserHandler(req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>, res: Response) {
    try {
        const user = await findUserAndUpdate(req.params.userId, req.body);
        res.json(omit(user?.toJSON(), privateFields))
    } catch(err: any) {
        // logger.error(err.code);
        if(err.code === 11000) {
            res.status(403).json({ message: 'Email is already registered'})
        } else res.status(400).json({ message: 'Cannot save changes'})
    }
}


export async function deleteUserHandler(req: Request<DeleteUserInput>, res: Response) {
    try {
        await findUserAndDelete(req.params.userId);
        res.json({ message: 'User has been deleted'})
    } catch(err) {
        logger.error(err);
        res.json(400).json(err)
    }
}

export async function followUserHandler(req: Request<FollowUserInput>, res: Response) {
    const { userId, meId } = req.params;
    const user = await findUser(userId);
    if(!user) return res.status(400).json({ message: 'User not found'});
    const me = await findUser(meId);

    //Handle Follow if i am not following the user
    if(!user.followers?.includes(meId) && !me?.following.includes(userId)) {
        user.followers.push(meId)
        //@ts-ignore
        me?.following.push(userId)
    } else {
        user.followers = user.followers.filter(id => id !== meId);
        //@ts-ignore
        me.following = me?.following.filter(id => id !== userId)
    }

    const a = await user.save();
    //@ts-ignore
    const b = await me.save();


    res.json({ a, b })
}


export async function getMe(req: Request, res: Response) {
    const { _id } = res.locals.user as UserDocument;
    const user = await findUser(_id);
    res.json(omit(user?.toJSON(), privateFields))
}