import { Request, Response } from "express";
import { omit } from "lodash";
import { UserDocument } from "../model/user.model";
import { CreatePictureInput, FindPictureInput, FindPicturesInput, UpdatePictureInput } from "../schema/picture.schema";
import { createPicture, deletePicture, deletePictures, findPicture, findPictures, updatePicture } from "../service/picture.service";

export async function createPictureHandler(req: Request<{}, {}, CreatePictureInput>, res: Response) {
    const picture = await createPicture(req.body);
    if(!picture) return res.status(400).json({ message: 'Cannot create picture.'})


    res.status(201).json(omit(picture.toJSON(), ['__v']))
}


export async function findPictureHandler(req: Request<FindPictureInput>, res: Response) {
    const picture = await findPicture(req.params.pictureId);
    if(!picture) return res.status(404).json({ message: 'Picture not found.'})


    res.json(omit(picture?.toJSON(), ['__v']))
}

export async function findPicturesHandler(req: Request<FindPicturesInput>, res: Response) {
    const pictures = await findPictures({ user: req.params.user })
    if(!pictures) return res.status(400).json({ message: 'Cannot find pictures'})


    res.json(pictures.map(pic => omit(pic.toJSON(), ['__v'])))
}

export async function updateMyPicture(req: Request<UpdatePictureInput['params'], {}, UpdatePictureInput['body']>, res: Response) {


    if(res.locals.user._id !== req.params.pictureId ) return res.sendStatus(401)
    const picture = await updatePicture(req.params.pictureId, req.body);
    if(!picture) return res.status(400).json({ message: 'picture not found'})


    res.json(omit(picture.toJSON(), ['__v']))
}

export async function deletePictureHandler(req: Request<FindPictureInput>, res: Response) {
    const picture = await deletePicture(req.params.pictureId)
    if(!picture) return res.status(400).json({ message: 'picture not found'})

    res.json({ message: 'Picture successfully deleted'})
}

export async function deletePicturesHandler(req: Request<FindPicturesInput>, res: Response) {
    const pictures = await deletePictures({ user: req.params.user })
    if(!pictures) return res.status(400).json({ message: 'No pictures found'})


    res.json({ message: 'Pictures successfully deleted'})
}


export async function likePictureHandler(req: Request<FindPictureInput>, res: Response) {
    const user = (res.locals.user as UserDocument)._id
    const picture = await findPicture(req.params.pictureId);
    if(!picture) return res.status(400).json({ message: 'picture not found'});


    if(picture.likes.indexOf(user) !== -1) {
        picture.likes = picture.likes.filter(userId => userId !== user)
    } else {
        picture.likes.push(user)
    }

    const edited = await picture.save();

    res.json(edited)
}


export async function viewPictureHandler(req: Request<FindPictureInput>, res: Response) {
    const user = (res.locals.user as UserDocument)._id
    const picture = await findPicture(req.params.pictureId);
    if(!picture) return res.status(400).json({ message: 'picture not found'});


    if(picture.views.indexOf(user) !== -1) {
        picture.views = picture.views.filter(userId => userId !== user)
    } else {
        picture.views.push(user)
    }

    const edited = await picture.save();

    res.json(edited)
}