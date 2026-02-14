import { useEffect, useState } from "react";
import { Box, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMessage2Exclamation } from '@tabler/icons-react';
import { DialogItemDropdownList } from "./DialogItemDropdownList";
import { CssComponent, format, getDateWithTimezone, getFullUrl, LinkButton, routeData, SimpleAvatar, SimpleList, SimpleListItem } from "../../../shared";
import { DialogModel, messageModel, useSessionProvider } from "../../../features";
import { useNavigate } from "react-router-dom";

const css: CssComponent = {
    listWrap: { textAlign: 'center', height: '100%', alignContent: 'center' },
    rightContentStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2,
        width: '70px',
    },
}

type DialogListProps = {
    searchText?: string,
}

export const DialogList = ({ searchText }: DialogListProps) => {
    const { sessionParams } = useSessionProvider();
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [dialogList, setDialogList] = useState<DialogModel[]>([]);
    const [filteredDialogList, setFilteredDialogList] = useState<DialogModel[]>([]);

    const getAllDialogList = async (userId: string) => {
        try {
            const dialogList = await messageModel.fetchDialogListByUserId(userId);
            setDialogList(dialogList ?? []);
            setIsLoading(false);
        }
        catch {
            setIsError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!sessionParams?.userInfo?.id)
            return;

        setIsLoading(true);
        getAllDialogList(sessionParams.userInfo.id);
    }, [sessionParams?.userInfo?.id])

    useEffect(() => {
        setIsLoading(true);
        const result = dialogList
            ?.filter(item => !searchText || item.interlocutor.FIO.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredDialogList(result);
        setIsLoading(false);
    }, [searchText, dialogList])

    return (
        <Box style={css.listWrap}>
            {!dialogList?.length && !isLoading && !isError &&
                <Text>Нет данных для отображения</Text>
            }
            {!filteredDialogList?.length && !!searchText && !isLoading && !isError &&
                <Text>Нет диалогов, удовлетворяющих указанным критериям</Text>
            }
            {(!dialogList?.length || !filteredDialogList?.length) && isLoading && !isError &&
                <>
                    <Text>Идет загрузка</Text>
                </>
            }
            {!isLoading && !!filteredDialogList?.length &&
                <SimpleList>
                    {filteredDialogList.map((item, idx) =>
                        <SimpleListItem
                            key={idx}
                            primaryValue={
                                <LinkButton
                                    handleClick={() => navigate(getFullUrl(routeData.dialogPage.path, 'dialogId', '1'))}
                                    name={item.interlocutor.FIO}
                                />
                            }
                            secondaryValue={format(getDateWithTimezone(item.lastMessageTime), 'dd.MM.yyyy HH:mm')}
                            avatar={
                                <SimpleAvatar
                                    link={item.interlocutor.avatar}
                                    userName={item.interlocutor.initials}
                                    color={mantineTheme.colors.textColor[colorScheme]}
                                />
                            }
                            rightContent={
                                <Box
                                    style={css.rightContentStyle}
                                >
                                    {item.lastMessageTime > item.lastVisitedTime &&
                                        <IconMessage2Exclamation color={'white'} />
                                    }
                                    <DialogItemDropdownList dialogId={item.id} />
                                </Box>
                            }
                        />
                    )}
                </SimpleList>
            }
            {!dialogList?.length && !isLoading && isError &&
                <Text>Произошла ошибка при загрузке данных. Попробуйте перезагрузить страницу или войдите позже</Text>
            }
        </Box>
    )
}