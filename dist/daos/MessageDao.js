"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = __importDefault(require("../mongoose/messages/MessageModel"));
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @implements {MessageDaoI} MessageDaoI
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
class MessageDao {
    constructor() {
        /**
         * Uses MessageModel to retrieve all message documents from messages collection sent by a user
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the messages are retrieved from database
         */
        this.findAllMessagesSentByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ from: uid })
                .populate("to")
                .exec();
        });
        /**
         * Uses MessageModel to retrieve all message documents from messages collection sent to a user
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the messages are retrieved from database
         */
        this.findAllMessagesSentToUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ to: uid })
                .populate("from")
                .exec();
        });
        /**
         * Inserts message instance into the database under user context
         * @param {string} source_uid source/actor user's primary key
         * @param {string} target_uid target user's primary key
         * @param {Message} message Instance to be inserted into the database
         * @returns Promise To be notified when message is inserted into the database
         */
        this.userSendsMessage = (source_uid, target_uid, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.create(Object.assign(Object.assign({}, message), { to: target_uid, from: source_uid })); });
        /**
         * Removes message from the database.
         * @param {string} mid Primary key of message to be removed
         * @returns Promise To be notified when message is removed from the database
         */
        this.userDeletesOneMessage = (mid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteOne({ _id: mid }); });
        /**
         * Removes all messages sent by a user from the database.
         * @param {string} uid Primary key of User that sent the messages to be removed
         * @returns Promise To be notified when messages are removed from the database
         */
        this.userDeletesAllSentMessage = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteMany({ from: uid }); });
        /**
         * Removes all messages sent by a user from the database.
         * @param {string} uid Primary key of User that sent the messages to be removed
         * @returns Promise To be notified when messages are removed from the database
         */
        this.userDeletesAllReceivedMessage = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteMany({ to: uid }); });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao;
    }
    return MessageDao.messageDao;
};
//# sourceMappingURL=MessageDao.js.map