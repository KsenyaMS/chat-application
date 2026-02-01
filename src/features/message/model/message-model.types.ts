import { UserModel } from "../../user"

export type DialogModel = {
    lastMessageTime: number,
    lastVisitedTime: number,
    interlocutor: UserModel,
    mainUser: UserModel,
    id: string,
}