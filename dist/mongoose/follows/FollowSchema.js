"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for follows
 */
const mongoose_1 = require("mongoose");
/**
 * @typedef Follow Represents the follow relation between one user and the other user
 * @property {ObjectId} userFollowing The id of the user that follows the other user
 * @property {ObjectId} userFollowed The id of the user that is followed by the other user
 */
const FollowSchema = new mongoose_1.default.Schema({
    userFollowing: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
    userFollowed: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "follows" });
exports.default = FollowSchema;
//# sourceMappingURL=FollowSchema.js.map