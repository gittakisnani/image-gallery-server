import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput, DeleteUserInput, GetUserInput, UpdateUserInput } from "../schema/user.schema";
import { createUser, findUser, findUserAndDelete, findUserAndUpdate, privateFields } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    try {
        const user = await createUser(req.body);
        res.status(201).json(omit(user.toJSON(), privateFields))
    } catch(err: any) {
        logger.error(err)
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
    } catch(err) {
        logger.error(err);
        res.status(400).json(err)
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