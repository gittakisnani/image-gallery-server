import { Router } from "express";
import validate from "../middleware/validateResource";
import { downloadSchema } from "../schema/download.schema";

const router = Router();

router.get('/download/:url', validate(downloadSchema), )

export default router;