import { Request, Response } from "express";
import { CreateSessionInput, FindSessionInput, FindSessionsInput } from "../schema/session.schema";
import { createSession, findSession, findSessions, updateSession, updateSessions } from "../service/session.service";
import { validatePassword } from "../service/user.service";

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
    const user = await validatePassword(req.body);
    //@ts-ignore
    if(user.error) return res.status(400).json({ message: user.message})

    const session = createSession(user, req.get('user-agent') || '')
    if(!session) return res.status(400).json({ message: 'Cannot create session.'});



    res.status(201).json(session)
}


export async function deleteSessionHandler(req: Request<FindSessionInput>, res: Response) {
    const { sessionId } = req.params;

    const session = updateSession(sessionId, { valid: false });
    if(!session) return res.status(400).json({ message: 'Session not found.'});

    res.json(session)
}



export async function deleteSessionsHandler(req: Request<FindSessionsInput>, res: Response) {
    const { user } = req.params;
    const sessions = updateSessions({ user }, { valid: false })
    if(!sessions) return res.status(400).json({ message: 'Sessions not found.'})


    res.json(sessions)
}

export async function findSessionHandler(req: Request<FindSessionInput>, res: Response) {
    const session = findSession(req.params.sessionId);
    if(!session) return res.status(400).json({ message: 'Cannot find session.'})


    res.json(session)
}


export async function findSessionsHandler(req: Request<FindSessionsInput>, res: Response) {
    const sessions = findSessions({ user: req.params.user });
    if(!sessions) return res.status(400).json({ message: 'Cannot find sessions.'});


    res.json(sessions)
}