"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for follows
 */
const mongoose = require("mongoose");
/**
 * @typedef Follow Represents the follow relation between one user and the other user
 * @property {ObjectId} userFollowing The id of the user that follows the other user
 * @property {ObjectId} userFollowed The id of the user that is followed by the other user
 */
const FollowSchema = new mongoose.Schema({
    userFollowing: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    userFollowed: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "follows" });
exports.default = FollowSchema;
//# sourceMappingURL=FollowSchema.js.map