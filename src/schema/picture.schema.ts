import { object, string, boolean, TypeOf } from "zod";

export const createPictureSchema = object({
    body: object({
        image: string({
            required_error: 'image url or buffer is required'
        }),
        user: string({
            required_error: 'user is required'
        }),
        free: boolean().default(true),
        location: string().optional()
    })
})

export const findPictureSchema = object({
    params: object({
        pictureId: string({
            required_error: 'pictureId is required'
        })
    })
})

export const findPicturesSchema = object({
    params: object({
        user: string({
            required_error: 'user is required'
        })
    })
})

//Owner can edit: license, location, likes, views
//Others can edit: likes, views

export const updatePictureSchema = object({
    params: object({
        pictureId: string({
            required_error: 'pictureId is required'
        })
    }),
    body: object({
        location: string().optional(),
        free: boolean().default(true),
        likes: string().optional(),
        views: string().optional()
    })
})

export const likeOrCollectPictureSchema = object({
    params: object({
        me: string(),
        picId: string()
    })
})


export const downloadImageSchema = object({
    body: object({
        url: string()
    })
})


export type CreatePictureInput = TypeOf<typeof createPictureSchema>['body'];
export type FindPictureInput = TypeOf<typeof findPictureSchema>['params'];
export type FindPicturesInput = TypeOf<typeof findPicturesSchema>['params'];
export type UpdatePictureInput = TypeOf<typeof updatePictureSchema>
export type LikeOrCollectPictureInput = TypeOf<typeof likeOrCollectPictureSchema>['params']
export type DownloadImageInput = TypeOf<typeof downloadImageSchema>['body']