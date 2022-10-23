"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for messages
 */
const mongoose_1 = require("mongoose");
/**
 * @typedef Message Represents the message object user sent
 * @property {string} message The content of the message
 * @property {ObjectId} to The user that received the message
 * @property {ObjectId} from The user that sent the message
 * @property {date} sentOn The date the message is sent
 */
const MessageSchema = new mongoose_1.default.Schema({
    message: { type: String, required: true },
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
    sentOn: { type: Date, default: Date.now }
}, { collection: "messages" });
exports.default = MessageSchema;
//# sourceMappingURL=MessageSchema.js.map