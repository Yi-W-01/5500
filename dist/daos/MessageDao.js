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
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = require("../mongoose/messages/MessageModel");
class MessageDao {
    constructor() {
        this.findAllMessagesSentByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ from: uid })
                .populate("to")
                .exec();
        });
        this.findAllMessagesSentToUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ to: uid })
                .populate("from")
                .exec();
        });
        this.userSendsMessage = (source_uid, target_uid, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.create(Object.assign(Object.assign({}, message), { to: target_uid, from: source_uid })); });
        this.userDeletesOneMessage = (mid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteOne({ _id: mid }); });
        this.userDeletesAllSentMessage = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteMany({ from: uid }); });
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