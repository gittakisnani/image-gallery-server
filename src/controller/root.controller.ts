import { Request, Response } from "express";
import path from 'path'


export function sendRootFile(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

export function sendNotFoundFile(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
}