import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Picture, { PictureDocument, PictureInput } from "../model/picture.model";


export async function createPicture(input: PictureInput) {
    return Picture.create(input)
}

export async function findPicture(pictureId: string) {
    return Picture.findById(pictureId).exec()
}

export async function findPictures(query: FilterQuery<PictureDocument>) {
    return Picture.find(query).exec()
}

export async function updatePicture(pictureId: string, update: UpdateQuery<PictureDocument>, options?: QueryOptions) {
    return Picture.findByIdAndUpdate(pictureId, update, {...(options && options), new: true }).exec()
}

export async function deletePicture(pictureId: string) {
    return Picture.findByIdAndDelete(pictureId).exec()
}

export async function deletePictures(query: FilterQuery<PictureDocument>) {
    return Picture.deleteMany(query).exec()
}