/**
 * @file Implements mongoose schema to CRUD documents in the likes collection
 */
import mongoose, { Schema } from "mongoose";
const LikeSchema = new mongoose.Schema({
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    likedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "likes" });
export default LikeSchema;
