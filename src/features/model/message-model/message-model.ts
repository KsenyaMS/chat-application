import { DialogModel } from "./message-model.types";
import { Dialog, Message, messageService } from "../../../api";
import { MessageModel } from "./message-model.types";
import { userModel, UserObj } from "../user-model";

const transformDialogForWeb = (dialogList: Dialog[], userDict: UserObj | undefined, userId: string): DialogModel[] => {
    return dialogList.map(dialog => {
        const mainUserId = dialog.userIds.find(id => id === userId);
        const interlocutorId = dialog.userIds.find(id => id !== userId);
        return {
            lastMessageTime: dialog.lastMessageTime,
            lastVisitedTime: dialog.lastVisitedTime,
            interlocutor: userDict?.[interlocutorId],
            mainUser: userDict?.[mainUserId],
            id: dialog.id,
        }
    })
}

export const fetchAllDialogList = async (userId: string,) => {
    try {
        const listFromLocalStorage = localStorage.getItem('dialogList');
        let list: DialogModel[] = [];

        if (listFromLocalStorage) {
            list = JSON.parse(listFromLocalStorage) ?? []
        }
        else {
            const allList = await messageService.getDialogList();
            const userDict = await userModel.fetchUserDict();
            list = transformDialogForWeb(allList, userDict, userId);
            localStorage.setItem('dialogList', JSON.stringify(list));
        }

        return list;
    }
    catch (err) {
        console.log({ err });
    }
}

export const fetchDialogListByUserId = async (userId: string) => {
    try {
        const dialogList = await fetchAllDialogList(userId);

        if (!dialogList?.length)
            return [];

        return dialogList.filter(item => item.mainUser.id === userId);
    }
    catch (err) {
        console.log({ err });

    }
}

const transformMessageForWeb = async (list: Message[]): Promise<MessageModel[]> => {
    const result: MessageModel[] = [];

    for (let i = 0; i < list?.length; i++) {
        const content = await messageService.getMessageContent(list[i].id);
        result.push({ ...list[i], ...content });
    }

    return result;
}

export const fetchMessageList = async (userId: string) => {
    try {
        const listFromLocalStorage = localStorage.getItem(`messageList-${userId}`);
        let list: MessageModel[] = [];

        if (listFromLocalStorage) {
            list = JSON.parse(listFromLocalStorage) ?? []
        }
        else {
            const allList = await messageService.getMessageList(userId);
            list = await transformMessageForWeb(allList);
            localStorage.setItem(`messageList-${userId}`, JSON.stringify(list));
        }

        return list;
    }
    catch (err) {
        console.log({ err });
    }
}