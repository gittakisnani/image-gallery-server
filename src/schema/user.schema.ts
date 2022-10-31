import { object, string, TypeOf } from 'zod'

//Any user should have:
//First and last name (Required while registration)
//email and password required in both login and registration

const body = {
        firstName: string({
            required_error: 'firstName is required'
        }),
        lastName: string({
            required_error: 'lastName is required'
        }),
        email: string({
            required_error: 'email is required'
        }).email('email is not a valid email'),
        password: string({
            required_error: 'password is required'
        }).min(8, 'Password should be 8 characters at least')
}

export const createUserSchema = object({
    body: object({
        ...body
    })
})

const userIdParams = {
    userId: string({
        required_error: 'userId is required'
    })
}

export const findUserSchema = object({
    params: object({
        ...userIdParams
    })
})

export const editUserSchema = object({
    params: object({
        ...userIdParams
    }),
    body: object({
        firstName: string().optional(),
        lastName: string().optional(),
        email: string().email('email is not a valid email').optional(),
        password: string().min(8, 'Password should be 8 characters at least').optional(),
        bio: string().optional(),
        picture: string().optional(),
        location: string().optional(),
        website: string().optional(),
        twitter: string().optional(),
        instagram: string().optional(),
        yt: string().optional(),
        tiktok: string().optional()
    })
})

export const followUserSchema = object({
    params: object({
        userId: string(),
        meId: string() 
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type GetUserInput = TypeOf<typeof findUserSchema>['params'];
export type DeleteUserInput = TypeOf<typeof findUserSchema>['params'];
export type UpdateUserInput = TypeOf <typeof editUserSchema>
export type FollowUserInput = TypeOf<typeof followUserSchema>['params']

