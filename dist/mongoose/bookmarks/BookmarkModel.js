"use strict";
/**
 * @file Implement mongoose model to CRUD
 * documents in the bookmarks collection
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const BookmarkSchema_1 = require("./BookmarkSchema");
const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema_1.default);
exports.default = BookmarkModel;
//# sourceMappingURL=BookmarkModel.js.map