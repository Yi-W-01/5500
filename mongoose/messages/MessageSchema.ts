/**
 * @file Implements mongoose schema for messages
 */
 import * as mongoose from 'mongoose'
 import Message from "../../models/messages/Messages";
 
 /**
  * @typedef Message Represents the message object user sent
  * @property {string} message The content of the message
  * @property {ObjectId} to The user that received the message
  * @property {ObjectId} from The user that sent the message
  * @property {date} sentOn The date the message is sent
  */
 const MessageSchema = new mongoose.Schema<Message>({
     message: {type: String, required: true},
     to: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
     from: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
     sentOn: {type: Date, default: Date.now}
 }, {collection: "messages"});
 
 export default MessageSchema; 