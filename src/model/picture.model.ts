//A Picture has:
//Number of views
//Number of downloads
//Number of likes
//Owner
//Free or license
//Size
//Created at
//location
import mongoose from "mongoose";
import { UserDocument } from "./user.model";


export interface PictureInput {
    user: UserDocument["_id"]
    free: boolean
    location?: string
    image: string
}


export interface PictureDocument extends PictureInput, mongoose.Document {
    likes: string[]
    views: string[]
    downloads: number
    size: number
    createdAt: Date
    updatedAt: Date
    canUpdateOrDelete: (userId: string ) => boolean
}

const pictureSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }],
    views: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }],
    downloads: {
        type: Number,
        required: true,
        default: 0
    },
    free: {
        type: Boolean,
        required: true,
        default: true
    },
    location: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
}
)


pictureSchema.methods.canUpdateOrDelete = function ( userId: string ): boolean {
    const picture = this as PictureDocument;
    return picture.user === userId
}

const Picture = mongoose.model<PictureDocument>('Picture', pictureSchema);

export default Picture