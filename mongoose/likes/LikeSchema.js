/**
 * @file Implements mongoose schema for likes
 */
import * as mongoose from 'mongoose';
/**
 * @typedef Like Represents the like relation between a user and a tuit
 * @property {ObjectId} tuit The id of the tuit like by user
 * @property {ObjectId} likedBy The id of the user
 */
const LikeSchema = new mongoose.Schema({
    tuit: { type: mongoose.Schema.Types.ObjectId, ref: "TuitModel" },
    likedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "likes" });
export default LikeSchema;
