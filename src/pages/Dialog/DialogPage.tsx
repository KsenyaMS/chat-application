import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { MessageModel, messageModel, useSessionProvider } from "../../features";
import { CssComponent, ThemeType } from "../../shared";
import { MessageInputBlock } from "../../widgets";

const css: CssComponent = {
    wrap: {
        height: '100%',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
        paddingBottom: '10px',
    }
}

export const DialogPage = () => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const { sessionParams } = useSessionProvider();
    const [messages, setMessages] = useState<MessageModel[]>([]);

    const itemBackgroundIndex = colorScheme === ThemeType.Light
        ? 5
        : 7;

    const getMessages = async () => {
        if (!sessionParams?.userInfo?.id)
            return;

        const list = await messageModel.fetchMessageList(sessionParams.userInfo.id);
        setMessages(list ?? []);
    }

    useEffect(() => {
        getMessages();
    }, [])

    return <Box
        style={{
            ...css.wrap,
            background: mantineTheme.colors.gray[itemBackgroundIndex],
        }}
    >
        <>
            {/* Поле для диалога */}
        </>
        <MessageInputBlock />
    </Box>
}