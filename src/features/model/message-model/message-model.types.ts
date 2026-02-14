import { UserModel } from "../../model";

export type DialogModel = {
    lastMessageTime: number,
    lastVisitedTime: number,
    interlocutor: UserModel,
    mainUser: UserModel,
    id: string,
}

export type MessageModel = {
    messageId: string,
    createdOn: number,
    userId: string,
    contentId: string,
    content: string,
};