import { object, string, TypeOf } from "zod";

export const downloadSchema = object({
    params: object({
        url: string()
    })
})


export type DownloadInput = TypeOf<typeof downloadSchema>['params']