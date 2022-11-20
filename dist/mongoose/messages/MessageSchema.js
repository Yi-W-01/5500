"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for messages
 */
const mongoose = __importStar(require("mongoose"));
/**
 * @typedef Message Represents the message object user sent
 * @property {string} message The content of the message
 * @property {ObjectId} to The user that received the message
 * @property {ObjectId} from The user that sent the message
 * @property {date} sentOn The date the message is sent
 */
const MessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    sentOn: { type: Date, default: Date.now }
}, { collection: "messages" });
exports.default = MessageSchema;
//# sourceMappingURL=MessageSchema.js.map