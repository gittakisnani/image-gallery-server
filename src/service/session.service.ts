import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Session, { SessionDocument, SessionInput } from "../model/session.model";

export async function createSession(userId: string, userAgent: string) {
    return await Session.create({ user: userId, userAgent })
}


export async function updateSession(query: string, update: UpdateQuery<SessionDocument>, options?: QueryOptions) {
    return await Session.findByIdAndUpdate(query, update, {...(options && options), new: true }).exec()
}

export async function updateSessions(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>, options?: QueryOptions) {
    return await Session.updateMany(query, update, {...(options && options), new: true }).exec()
}


export async function findSession(query: string) {
    return await Session.findById(query).exec()
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return await Session.find(query).exec()
}