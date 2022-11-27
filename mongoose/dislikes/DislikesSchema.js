/**
 * @file Implements mongoose schema to CRUD documents in the dislikes collection
 */
import mongoose, { Schema } from "mongoose";
const DislikeSchema = new mongoose.Schema({
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    dislikedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "dislikes" });
export default DislikeSchema;
