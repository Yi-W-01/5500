"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LikeSchema_1 = require("./LikeSchema");
const LikeModel = mongoose_1.default.model("LikeModel", LikeSchema_1.default);
exports.default = LikeModel;
//# sourceMappingURL=LikeModel.js.map