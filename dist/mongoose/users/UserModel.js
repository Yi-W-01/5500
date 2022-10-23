"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema_1 = require("./UserSchema");
const UserModel = mongoose_1.default.model('UserModel', UserSchema_1.default);
exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map