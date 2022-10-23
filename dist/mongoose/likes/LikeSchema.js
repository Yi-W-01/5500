"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for likes
 */
const mongoose_1 = require("mongoose");
/**
 * @typedef Like Represents the like relation between a user and a tuit
 * @property {ObjectId} tuit The id of the tuit like by user
 * @property {ObjectId} likedBy The id of the user
 */
const LikeSchema = new mongoose_1.default.Schema({
    tuit: { type: mongoose_1.Schema.Types.ObjectId, ref: "TuitModel" },
    likedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "likes" });
exports.default = LikeSchema;
//# sourceMappingURL=LikeSchema.js.map