import { Dialog, messageService } from "../../../api"
import { userModel, UserObj } from "../../model";
import { DialogModel } from "./message-model.types";

const transformForWeb = (dialogList: Dialog[], userDict: UserObj | undefined, userId: string): DialogModel[] => {
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
            list = transformForWeb(allList, userDict, userId);
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