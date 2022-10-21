import express from 'express';
import logger from './utils/logger';
import cors from 'cors'
import corsOptions from './utils/corsOptions';
import config from 'config'

const app = express();
const PORT = config.get<number>('port')

app.use(cors(corsOptions))
app.use(express.json());


app.listen(PORT, () => logger.info('Server running'))