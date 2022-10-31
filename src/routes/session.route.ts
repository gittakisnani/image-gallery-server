import { Router } from "express";
import { createSessionHandler, deleteSessionHandler, deleteSessionsHandler, findSessionHandler, findSessionsHandler, logoutHandler, refreshAccessToken } from "../controller/session.controller";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateResource";
import { createSessionSchema, findSessionSchema, findSessionsSchema } from "../schema/session.schema";

const router = Router();

router.post('/sessions/create', validate(createSessionSchema), createSessionHandler)
router.get('/sessions/refresh', refreshAccessToken)
router.get('/sessions/logout', requireUser, logoutHandler)


router.route('/sessions/:user')
    .put(validate(findSessionsSchema), deleteSessionsHandler)
    .get(validate(findSessionsSchema), findSessionsHandler)

router.route('/sessions/:sessionId')
    .put(validate(findSessionSchema), deleteSessionHandler)
    .get(validate(findSessionSchema), findSessionHandler)

export default router;