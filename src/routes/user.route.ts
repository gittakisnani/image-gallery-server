import { Router } from "express";   
import { createUserHandler, deleteUserHandler, findUserHandler, followUserHandler, getMe, updateUserHandler } from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateResource";
import { createUserSchema, editUserSchema, findUserSchema, followUserSchema } from "../schema/user.schema";

const router = Router();

router.post('/users/create',validate(createUserSchema), createUserHandler)
router.get('/me', requireUser, getMe)

router.route('/users/:userId')
    .get(validate(findUserSchema), findUserHandler)
    .put(validate(editUserSchema), requireUser, updateUserHandler)
    .delete(validate(findUserSchema), requireUser, deleteUserHandler)

router.put('/follow/:userId/:meId', validate(followUserSchema), requireUser, followUserHandler)



export default router;