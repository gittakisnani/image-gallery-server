import { Request, Response } from "express";
import { get } from "lodash";
import { UserDocument } from "../model/user.model";
import { CreateSessionInput, FindSessionInput, FindSessionsInput } from "../schema/session.schema";
import { cookiesOptions, createSession, findSession, findSessions, signAccessToken, signRefreshToken, updateSession, updateSessions } from "../service/session.service";
import { findUser, validatePassword } from "../service/user.service";
import { verifyJWT } from "../utils/jwt.util";

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
    const user = await validatePassword(req.body);
    //@ts-ignore
    if(user.error) return res.status(400).json({ message: user.message })

    const session = await createSession((user as UserDocument)._id, req.get('user-agent') || '')
    if(!session) return res.status(400).json({ message: 'Cannot create session.'});


    const accessToken = signAccessToken(user as UserDocument);
    const refreshToken = signRefreshToken(session);
    res.cookie('at', accessToken, cookiesOptions)
    res.cookie('rt', refreshToken, {...cookiesOptions, maxAge: 31557600000 })


    res.status(201).json({ accessToken, refreshToken })
}


export async function refreshAccessToken(req: Request, res: Response) {
    const refreshToken = get(req.cookies, 'rt');
    if(!refreshToken) return res.status(401).json({ message: 'Cannot refresh accessToken, No accesstoken provided'});

    const decoded = verifyJWT<{ session: string }>(refreshToken, 'refreshTokenPublicKey');
    if(!decoded) return res.status(401).json({ message: 'Cannot refresh accessToken, refreshtoken is expired'});


    const session = await findSession(decoded.session);
    if(!session || !session.valid) return res.status(401).json({ message: 'Cannot refresh accessToken'});

    const user = await findUser(session.user);
    if(!user) return res.status(401).json({ message: 'Cannot refresh accessToken, no user matches'});

    const newAccessToken = signAccessToken(user);
    
    res.json({ newAccessToken })
}


export async function deleteSessionHandler(req: Request<FindSessionInput>, res: Response) {
    const { sessionId } = req.params;

    const session = await updateSession(sessionId, { valid: false });
    if(!session) return res.status(400).json({ message: 'Session not found.'});

    res.json(session)
}



export async function deleteSessionsHandler(req: Request<FindSessionsInput>, res: Response) {
    const { user } = req.params;
    const sessions = await updateSessions({ user }, { valid: false })
    if(!sessions) return res.status(400).json({ message: 'Sessions not found.'})


    res.json(sessions)
}

export async function findSessionHandler(req: Request<FindSessionInput>, res: Response) {
    const session = await findSession(req.params.sessionId);
    if(!session) return res.status(400).json({ message: 'Cannot find session.'})


    res.json(session)
}


export async function findSessionsHandler(req: Request<FindSessionsInput>, res: Response) {
    const sessions = await findSessions({ user: req.params.user });
    if(!sessions) return res.status(400).json({ message: 'Cannot find sessions.'});


    res.json(sessions)
}