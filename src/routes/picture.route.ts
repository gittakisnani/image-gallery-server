import { Router } from "express";
import { collectPictureHandler, createPictureHandler, deletePictureHandler, deletePicturesHandler, downloadImage, findAllPictures, findPictureHandler, findPicturesHandler, likePictureHandler, updateMyPicture } from "../controller/picture.controller";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateResource";
import { createPictureSchema, downloadImageSchema, findPictureSchema, findPicturesSchema, likeOrCollectPictureSchema, updatePictureSchema } from "../schema/picture.schema";

const router = Router();



router.post('/pictures/new', validate(createPictureSchema), requireUser, createPictureHandler)

router.get('/download', validate(downloadImageSchema), downloadImage)

router.get('/pictures', findAllPictures)
router.route('/pictures/:pictureId')
    .get(validate(findPictureSchema), findPictureHandler)
    .put(validate(updatePictureSchema), requireUser, updateMyPicture)
    .delete(validate(findPictureSchema), requireUser, deletePictureHandler)

router.route('/pictures/:user/pictures')
    .get(validate(findPicturesSchema), findPicturesHandler)
    .delete(validate(findPicturesSchema), requireUser,deletePicturesHandler)

router.put('/like/:me/:picId', validate(likeOrCollectPictureSchema), requireUser, likePictureHandler);
router.put('/collect/:pictureId', validate(findPictureSchema), requireUser, collectPictureHandler)



export default router;