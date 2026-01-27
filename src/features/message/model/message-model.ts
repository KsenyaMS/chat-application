import axios from "axios";
import { BASE_URL } from "../../../shared";
import { Dialog } from "./message-model.types";


export const getDialogList = async (userId: string) => {
    const response = await axios.get<Dialog[]>(`${BASE_URL}/dialogs`);
    return response.data?.length
        ? response.data.filter(item => item.userIds.includes(userId))
        : [];
}

export const removeDialog = async (dialogId: string) => {
    try {
        return await axios.delete(`${BASE_URL}/dialogs/${dialogId}`);
    }
    catch {
        throw new Error('При попытке удалить диалог возникла ошибка!');
    };
}

