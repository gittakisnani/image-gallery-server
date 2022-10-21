import pino from "pino";
import dayjs from "dayjs";

const logger = pino({
    transport: {
        target: 'pino-pretty'
    },
    level: 'info',
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format('YYYY MM-DDTHH:mm:ss')}"`
})

export default logger;