import mongoose from "mongoose";
import { UserDocument } from "./user.model";



//The schema contains:
//The user that it refers to.
//the user agent
//The date it was 

export interface SessionInput {
    userId: UserDocument['_id']
    userAgent: string
}


export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"]
    valid: boolean
    userAgent: string
    createdAt: Date
    updatedAt: Date
} 

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    valid: {
        type: Boolean,
        required: true,
        default: true
    },
    userAgent: {
        type: String,
        required: true
    }
},
{
    timestamps: true 
})


const Session = mongoose.model<SessionDocument>('Session', sessionSchema);

export default Session