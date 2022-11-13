import { Router } from "express";   
import { createUserHandler, deleteUserHandler, findUserHandler, followUserHandler, getMe, getUserLikesAndBookmarks, updateUserHandler } from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateResource";
import { createUserSchema, editUserSchema, findUserSchema, followUserSchema, likesAndBookmarksSchema } from "../schema/user.schema";


const router = Router();

router.get('/login', (_, res) => res.send('Login again'))
router.get('/success', (_, res) => res.send('Success!'))
router.post('/users/create',validate(createUserSchema), createUserHandler)
router.get('/me', requireUser, getMe)
router.get('/user/likes-and-bookmarks', getUserLikesAndBookmarks)

router.route('/users/:userId')
    .get(validate(findUserSchema), findUserHandler)
    .put(validate(editUserSchema), requireUser, updateUserHandler)
    .delete(validate(findUserSchema), requireUser, deleteUserHandler)

router.put('/follow/:userId/:meId', validate(followUserSchema), requireUser, followUserHandler)



export default router;