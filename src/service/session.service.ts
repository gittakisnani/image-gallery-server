import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Session, { SessionDocument, SessionInput } from "../model/session.model";

export async function createSession(userId: string, userAgent: string) {
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