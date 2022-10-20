import Message from "../models/messages/Messages";

export default interface MessageDaoI{
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    findAllMessagesSentToUser (uid: string): Promise<Message[]>;
    userSendsMessage (source_uid: string, target_uid: string,  message: Message): Promise<Message>;
    userDeletesOneMessage (mid: string): Promise<any>;
    userDeletesAllSentMessage (uid: string): Promise<any>;
    userDeletesAllReceivedMessage (uid: string): Promise<any>;
}