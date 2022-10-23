"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the follows collection
 */
const mongoose = require("mongoose");
const FollowSchema_1 = require("./FollowSchema");
const FollowModel = mongoose.model("FollowModel", FollowSchema_1.default);
exports.default = FollowModel;
//# sourceMappingURL=FollowModel.js.map