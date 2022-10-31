import { Request, Response } from "express";
import { omit } from "lodash";
import { UserDocument } from "../model/user.model";
import { CreatePictureInput, FindPictureInput, FindPicturesInput, LikeOrCollectPictureInput, UpdatePictureInput } from "../schema/picture.schema";
import { createPicture, deletePicture, deletePictures, findPicture, findPictures, updatePicture } from "../service/picture.service";
import { findUser } from "../service/user.service";
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

export async function findAllPictures(req: Request, res: Response) {
    const pictures = await findPictures({ });
    if(!pictures) return res.status(400).json({ message: 'No pictures found'}) 


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


export async function likePictureHandler(req: Request<LikeOrCollectPictureInput>, res: Response) {
    const { picId, me: user} = req.params;
    const picture = await findPicture(picId);
    if(!picture) return res.status(400).json({ message: 'picture not found'});
    const me = await findUser(user)

    if(!picture.likes.includes(user) && !me?.my_likes.includes(picId)) {
        picture.likes.push(user);
        me?.my_likes.push(picId)
    } else {
        picture.likes = picture.likes.filter(id => id !== user)
        //@ts-ignore
        me?.my_likes = me?.my_likes.filter(id => id !== picId) 
    }
    
    await picture.save();
    //@ts-ignore
    await me.save();

    res.json({ picture, me })
}

export async function collectPictureHandler(req: Request<FindPictureInput>, res: Response) {
    const { pictureId } = req.params
    const userId = res.locals.user._id as string;
    const me = await findUser(userId);

    if(me?.my_bookmarks.includes(pictureId)) {
        me.my_bookmarks = me.my_bookmarks.filter(id => id !== pictureId)
    } else {
        me?.my_bookmarks.push(pictureId)
    }

    //@ts-ignore
    await me.save()
}