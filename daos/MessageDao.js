var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MessageModel from "../mongoose/messages/MessageModel";
export default class MessageDao {
    constructor() {
        this.findAllMessagesSentByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel
                .find({ from: uid })
                .populate("to")
                .exec();
        });
        this.findAllMessagesSentToUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel
                .find({ to: uid })
                .populate("from")
                .exec();
        });
        this.userSendsMessage = (source_uid, target_uid, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel.create(Object.assign(Object.assign({}, message), { to: target_uid, from: source_uid })); });
        this.userDeletesOneMessage = (mid) => __awaiter(this, void 0, void 0, function* () { return MessageModel.deleteOne({ _id: mid }); });
        this.userDeletesAllSentMessage = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel.deleteMany({ from: uid }); });
        this.userDeletesAllReceivedMessage = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel.deleteMany({ to: uid }); });
    }
}
MessageDao.messageDao = null;
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao;
    }
    return MessageDao.messageDao;
};
