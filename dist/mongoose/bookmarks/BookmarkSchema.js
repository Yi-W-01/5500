"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for bookmarks
 */
const mongoose = require("mongoose");
/**
 * @typedef Bookmark Represents the bookmark relation between a user and a tuit
 * @property {ObjectId} bookmarkedTuit The id of the tuit like by user
 * @property {ObjectId} bookmarkedBy The id of the user
 */
const BookmarkSchema = new mongoose.Schema({
    bookmarkedTuit: { type: mongoose.Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }
}, { collection: "bookmarks" });
exports.default = BookmarkSchema;
//# sourceMappingURL=BookmarkSchema.js.map