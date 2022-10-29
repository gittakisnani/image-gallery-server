import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Session, { SessionDocument, SessionInput } from "../model/session.model";
import config from 'config'
import { UserDocument } from "../model/user.model";
import { singJWT } from "../utils/jwt.util";
import { CookieOptions } from "express";


export const cookiesOptions: CookieOptions = {
    secure: true,
    sameSite: 'none',
    httpOnly: true,
    maxAge: 60 * 15 * 1000
}



export async function createSession(userId: string, userAgent?: string) {
    return Session.create({ user: userId, userAgent })
}


export async function updateSession(query: string, update: UpdateQuery<SessionDocument>, options?: QueryOptions) {
    return Session.findByIdAndUpdate(query, update, {...(options && options), new: true }).exec()
}

export async function updateSessions(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>, options?: QueryOptions) {
    return Session.updateMany(query, update, {...(options && options), new: true }).exec()
}


export async function findSession(query: string) {
    return Session.findById(query).exec()
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return Session.find(query).exec()
}

export function signAccessToken(user: UserDocument) {
    const payload = user.toJSON();
    const accessToken = singJWT(payload, 'accessTokenPrivateKey', { expiresIn: config.get<string>('accessTokenTtl') })

    return accessToken
}


export function signRefreshToken(session: SessionDocument) {
    const payload = session.toJSON()

    const refreshToken = singJWT({ session: payload._id }, 'refreshTokenPrivateKey', { expiresIn: config.get<string>('refreshTokenTtl')})
    return refreshToken;
}