"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDao_1 = require("../daos/MessageDao");
class MessageController {
    constructor() {
        this.findAllMessagesSentByUser = (req, res) => MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));
        this.findAllMessagesSentToUser = (req, res) => MessageController.messageDao.findAllMessagesSentToUser(req.params.uid)
            .then(messages => res.json(messages));
        this.userSendsMessage = (req, res) => MessageController.messageDao.userSendsMessage(req.params.source_uid, req.params.target_uid, req.body)
            .then(messages => res.json(messages));
        this.userDeletesOneMessage = (req, res) => MessageController.messageDao.userDeletesOneMessage(req.params.mid)
            .then(status => res.send(status));
        this.userDeletesAllSentMessage = (req, res) => MessageController.messageDao.userDeletesAllSentMessage(req.params.uid)
            .then(status => res.send(status));
        this.userDeletesAllReceivedMessage = (req, res) => MessageController.messageDao.userDeletesAllReceivedMessage(req.params.uid)
            .then(status => res.send(status));
    }
    ;
}
exports.default = MessageController;
MessageController.messageDao = MessageDao_1.default.getInstance();
MessageController.messageController = null;
MessageController.getInstance = (app) => {
    if (MessageController.messageController === null) {
        MessageController.messageController = new MessageController();
        app.get("/api/users/:uid/messages", MessageController.messageController.findAllMessagesSentByUser);
        app.get("/api/users/:uid/messaged", MessageController.messageController.findAllMessagesSentToUser);
        app.post("/api/users/:source_uid/messages/:target_uid", MessageController.messageController.userSendsMessage);
        app.delete("/api/users/:uid/messages/:mid", MessageController.messageController.userDeletesOneMessage);
        app.delete("/api/users/:uid/messages", MessageController.messageController.userDeletesAllSentMessage);
        app.delete("/api/users/:uid/messaged", MessageController.messageController.userDeletesAllReceivedMessage);
    }
    return MessageController.messageController;
};
//# sourceMappingURL=MessageController.js.map