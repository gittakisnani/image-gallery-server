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

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use(userRoute)
app.use(sessionRoute)
app.use(pictureRoute)

app.use(express.static(path.join(__dirname, 'public')))
app.use(rootRoute)

app.listen(PORT, () => {
    logger.info('Server running');
    connect()
})