import { TypeOf, object, string } from "zod";


export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: 'email is required'
        }).email('email is not a valid email'),
        password: string({
            required_error: 'password is required'
        })
    })
})


export const findSessionSchema = object({
    params: object({
        sessionId: string({
            required_error: 'sessionId is required'
        })
    })
})


export const findSessionsSchema = object({
    params: object({
        user: string({
            required_error: 'user is required'
        })
    })
})



export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body'];
export type FindSessionInput = TypeOf<typeof findSessionSchema>['params'];
export type FindSessionsInput = TypeOf<typeof findSessionsSchema>['params']
