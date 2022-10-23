import { Router } from "express";
import { createSessionHandler, deleteSessionHandler, deleteSessionsHandler, findSessionHandler, findSessionsHandler } from "../controller/session.controller";
import validate from "../middleware/validateResource";
import { createSessionSchema, findSessionSchema, findSessionsSchema } from "../schema/session.schema";

const router = Router();

router.post('/sessions/new', validate(createSessionSchema), createSessionHandler)


router.route('/sessions/:user')
    .put(validate(findSessionsSchema), deleteSessionsHandler)
    .get(validate(findSessionsSchema), findSessionsHandler)

router.route('/sessions/:sessionId')
    .put(validate(findSessionSchema), deleteSessionHandler)
    .get(validate(findSessionSchema), findSessionHandler)

export default router;