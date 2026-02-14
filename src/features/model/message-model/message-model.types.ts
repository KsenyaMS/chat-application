import { Message } from "../../../api";
import { UserModel } from "../../model";

export type DialogModel = {
    lastMessageTime: number,
    lastVisitedTime: number,
    interlocutor: UserModel,
    mainUser: UserModel,
    id: string,
}

export type MessageModel = Message & {
    content: string,
    contentId: string,
}