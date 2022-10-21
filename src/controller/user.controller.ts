import { Request, Response } from "express";
import { CreateUserInput, DeleteUserInput, GetUserInput, UpdateUserInput } from "../schema/user.schema";
import { createUser, findUser, findUserAndDelete, findUserAndUpdate } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    try {
        const user = createUser(req.body);
        res.status(201).json(user)
    } catch(err) {
        logger.error(err)
        res.status(400).json(err)
    }
}

export async function findUserHandler(req: Request<GetUserInput>, res: Response) {
    try {
        const user = findUser(req.params);
        res.json(user)
    } catch(err) {
        logger.error(err);
        res.status(400).json(err)
    }
}

export async function updateUserHandler(req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>, res: Response) {
    try {
        const user = findUserAndUpdate(req.params, req.body);
        res.json(user)
    } catch(err) {
        logger.error(err);
        res.status(400).json(err)
    }
}


export async function deleteUserHandler(req: Request<DeleteUserInput>, res: Response) {
    try {
        findUserAndDelete(req.params);
        res.json({ message: 'User has been deleted'})
    } catch(err) {
        logger.error(err);
        res.json(400).json(err)
    }
}