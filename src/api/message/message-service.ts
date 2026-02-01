import axios from "axios";
import { BASE_URL } from "../../shared";
import { Dialog } from "./message-service.types";


export const getDialogList = async () => {
    const response = await axios.get<Dialog[]>(`${BASE_URL}/dialogs`);
    return response.data ?? [];
}

export const removeDialog = async (dialogId: string) => {
    try {
        return await axios.delete(`${BASE_URL}/dialogs/${dialogId}`);
    }
    catch {
        throw new Error('При попытке удалить диалог возникла ошибка!');
    };
}

