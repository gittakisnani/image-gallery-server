import { Router } from "express";
import { sendNotFoundFile, sendRootFile } from "../controller/root.controller";


const router = Router();
router.get('^/$|/index(.html)?', sendRootFile)
router.all('*', sendNotFoundFile)


export default router;