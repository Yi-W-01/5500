import {Express, Request, Response} from "Express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageController";

export default class MessageController implements MessageControllerI{
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
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
    }

    private constructor() {};

    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    findAllMessagesSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentToUser(req.params.uid)
            .then(messages => res.json(messages));

    userSendsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(req.params.source_uid, req.params.target_uid, req.body)
            .then(messages => res.json(messages));

    userDeletesOneMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesOneMessage(req.params.mid)
            .then(status => res.send(status));

    userDeletesAllSentMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesAllSentMessage(req.params.uid)
            .then(status => res.send(status));
    
    userDeletesAllReceivedMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesAllReceivedMessage(req.params.uid)
            .then(status => res.send(status));
}