import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import config from 'config';


const storage = new GridFsStorage({
    url: config.get<string>('databaseUri'),
    options: { useNewUrlParser: true, useUnifiedTopology: true  },
    file(request, file) {
        const match = ['image/png', 'image/jpeg', 'image/jpg'];

        if(match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname?.replaceAll(" ", "")}`;
            return filename
        }



        return {
            bucketName: 'photos',
            filename: `${Date.now()}-${file.originalname?.replaceAll(" ", "")}`
        }
    },
})


export default multer({ storage })