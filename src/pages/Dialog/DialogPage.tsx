import { Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { MessageModel, messageModel, useSessionProvider } from "../../features";

export const DialogPage = () => {
    const { sessionParams } = useSessionProvider();
    const [messages, setMessages] = useState<MessageModel[]>([]);
    console.log({ messages });


    const getMessages = async () => {
        if (!sessionParams?.userInfo?.id)
            return;

        const list = await messageModel.fetchMessageList(sessionParams.userInfo.id);
        setMessages(list ?? []);
    }

    useEffect(() => {
        getMessages();
    }, [])

    return <Box style={{ height: '100%' }}>
    </Box>
}