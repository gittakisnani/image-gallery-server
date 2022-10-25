import { Router } from "express";
import { sendNotFoundFile, sendRootFile } from "../controller/root.controller";
import upload from "../middleware/upload";

const router = Router();
router.get('^/$|/index(.html)?', sendRootFile)
router.post('/file/upload', upload.single('file'), async (req, res) => {
    if(!req.file) return res.send('No file found');
    console.log(req.file)
    const imageUrl = `http://localhost:1337/file/${req.file.filename}`;
    res.send(imageUrl)
})
router.all('*', sendNotFoundFile)




export default router;