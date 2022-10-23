/**
 * @file Implements mongoose schema for bookmarks
 */
import * as mongoose from 'mongoose'
import Bookmark from "../../models/bookmarks/bookmarks";

/**
 * @typedef Bookmark Represents the bookmark relation between a user and a tuit
 * @property {ObjectId} bookmarkedTuit The id of the tuit like by user
 * @property {ObjectId} bookmarkedBy The id of the user
 */

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: mongoose.Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "bookmarks"});

export default BookmarkSchema;