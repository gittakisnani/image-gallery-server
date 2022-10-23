import { Router } from "express";
import { createPictureHandler, deletePictureHandler, deletePicturesHandler, findPictureHandler, findPicturesHandler, likePictureHandler, updateMyPicture, viewPictureHandler } from "../controller/picture.controller";
import validate from "../middleware/validateResource";
import { createPictureSchema, findPictureSchema, findPicturesSchema, updatePictureSchema } from "../schema/picture.schema";

const router = Router();



router.post('/pictures/new', validate(createPictureSchema), createPictureHandler)

router.route('/pictures/:pictureId')
    .get(validate(findPictureSchema), findPictureHandler)
    .put(validate(updatePictureSchema), updateMyPicture)
    .delete(validate(findPictureSchema), deletePictureHandler)

router.route('/pictures/:user')
    .get(validate(findPicturesSchema), findPicturesHandler)
    .delete(validate(findPicturesSchema), deletePicturesHandler)

router.put('/pictures/like/:pictureId', validate(findPictureSchema), likePictureHandler)
router.put('/pictures/view/:pictureId', validate(findPictureSchema), viewPictureHandler)


export default router;