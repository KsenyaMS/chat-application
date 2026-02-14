import axios from "axios";
import { BASE_URL } from "../../shared";
import { Dialog, Message, MessageContent } from "./message-service.types";

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

export const getMessageList = async (userId: string) => {
    const response = await axios.get<Message[]>(`${BASE_URL}/messages`);
    return response.data?.filter(item => item.userId === userId) ?? [];
}

export const getMessageContent = async (messageId: string) => {
    const response = await axios.get<MessageContent>(`${BASE_URL}/message-content/${messageId}`);
    return response.data;
}



