/**
 * @file Implements mongoose schema for follows
 */
import mongoose, { Schema } from "mongoose";
/**
 * @typedef Follow Represents the follow relation between one user and the other user
 * @property {ObjectId} userFollowing The id of the user that follows the other user
 * @property {ObjectId} userFollowed The id of the user that is followed by the other user
 */
const FollowSchema = new mongoose.Schema({
    userFollowing: { type: Schema.Types.ObjectId, ref: "UserModel" },
    userFollowed: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "follows" });
export default FollowSchema;
