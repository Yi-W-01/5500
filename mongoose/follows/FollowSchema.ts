/**
 * @file Implements mongoose schema for follows
 */
 import * as mongoose from 'mongoose'
import Follow from "../../models/follows/Follow";

/**
 * @typedef Follow Represents the follow relation between one user and the other user
 * @property {ObjectId} userFollowing The id of the user that follows the other user
 * @property {ObjectId} userFollowed The id of the user that is followed by the other user
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowing: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    userFollowed: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});

export default FollowSchema;