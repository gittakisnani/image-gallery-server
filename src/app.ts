import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import logger from './utils/logger';
import cors from 'cors'
import corsOptions from './utils/corsOptions';
import config from 'config'
import { userRoute, sessionRoute, pictureRoute, rootRoute } from './routes';
import path from 'path'
import connect from './utils/dbConnect';
const app = express();
const PORT = config.get<number>('port')
import mongoose from 'mongoose'
import Grid, { Grid as GridInterface } from 'gridfs-stream'

let gfs: GridInterface, gridFsBucket: any;

const connection = mongoose.connection;
connection.once('open', function() {
    gridFsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: 'photos'
    })
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('photos')
})

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use(userRoute)
app.use(sessionRoute)
app.use(pictureRoute)

app.use(express.static(path.join(__dirname, 'public')))
app.get('/file/:filename', async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        gridFsBucket.openDownloadStream(file?._id).pipe(res)
    } catch (error) {
        logger.error(error)
        res.send('Not found')
    }
})

app.use(rootRoute)
app.listen(PORT, () => {
    logger.info('Server running');
    connect()
})