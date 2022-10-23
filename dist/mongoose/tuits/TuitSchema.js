"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const TuitSchema = new mongoose.Schema({
    tuit: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "tuits" });
exports.default = TuitSchema;
//# sourceMappingURL=TuitSchema.js.map