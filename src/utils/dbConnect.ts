import mongoose from "mongoose";
import logger from "./logger";
import config from 'config'

export default function connect() {
    try {
        mongoose.connect(config.get<string>('databaseUri'))
        
        logger.info('Connected to DB')
    } catch(err) {
        logger.error(err)
        process.exit(1)
    }
}