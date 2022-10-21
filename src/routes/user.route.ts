import { Router } from "express";   
import { createUserHandler, deleteUserHandler, findUserHandler, updateUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema, editUserSchema, findUserSchema } from "../schema/user.schema";

const router = Router();

router.post('/users/create',validate(createUserSchema), createUserHandler)

router.route('/users/:userId')
    .get(validate(findUserSchema), findUserHandler)
    .put(validate(editUserSchema), updateUserHandler)
    .delete(validate(findUserSchema), deleteUserHandler)



export default router;