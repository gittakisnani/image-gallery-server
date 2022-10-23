import express from 'express';
import logger from './utils/logger';
import cors from 'cors'
import corsOptions from './utils/corsOptions';
import config from 'config'
import { userRoute, sessionRoute, pictureRoute } from './routes';
const app = express();
const PORT = config.get<number>('port')

app.use(cors(corsOptions))
app.use(express.json());



app.use(userRoute)
app.use(sessionRoute)
app.use(pictureRoute)


app.listen(PORT, () => logger.info('Server running'))