import { CorsOptions } from "cors";
import whiteList from "./whiteList";

const corsOptions: CorsOptions = {
    origin(requestOrigin, callback) {
        if(whiteList.indexOf(requestOrigin as string) !== -1 || !requestOrigin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS '))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

export default corsOptions