import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJWT } from "../utils/jwt.util";

export default function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = get(req, 'cookies.at')
    if(!accessToken) return next();

    const decoded = verifyJWT(accessToken, 'accessTokenPublicKey');
    if(decoded) {
        res.locals.user = decoded
    }
    return next()
} 