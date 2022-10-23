"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TuitSchema = new mongoose_1.default.Schema({
    tuit: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    postedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "tuits" });
exports.default = TuitSchema;
//# sourceMappingURL=TuitSchema.js.map