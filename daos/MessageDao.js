var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageModel from "../mongoose/messages/MessageModel";
import messageModel from "../mongoose/messages/MessageModel";
import { now } from "mongoose";
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao {
    constructor() {
        this.createMessageByUsers = (from, to, content) => __awaiter(this, void 0, void 0, function* () { return MessageModel.create({ from: from, to: to, message: content, sentOn: now() }); });
        this.deleteMessageById = (mid) => __awaiter(this, void 0, void 0, function* () { return MessageModel.deleteOne({ _id: mid }); });
        this.findAllMessagesSentByUser = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel.find({ from: uid }).exec(); });
        this.findAllMessagesReceivedByUser = (uid) => __awaiter(this, void 0, void 0, function* () { return messageModel.find({ to: uid }).exec(); });
    }
}
MessageDao.messageDao = null;
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
