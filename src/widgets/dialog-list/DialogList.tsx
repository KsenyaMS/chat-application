import { useEffect, useState } from "react";
import { CssComponent, format, getDateWithTimezone, getUserFIO, getUserInitials, SimpleList, SimpleListItemType } from "../../shared";
import { Box, Text } from "@mantine/core";
import { getDialogList } from "../../features/message/model";
import { useSessionProvider } from "../../features";
import { IconMessage2Exclamation } from '@tabler/icons-react';
import { DialogItemDropdownList } from "./DialogItemDropdownList";
import { getUserList } from "../../api/user/user-service";
import { UserInfo } from "../../api";

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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [dialogList, setDialogList] = useState<SimpleListItemType[]>([]);
    const [filteredDialogList, setFilteredDialogList] = useState<SimpleListItemType[]>([]);

    const getAllDialogList = async (userId: string) => {
        try {
            const dialogs = await getDialogList(userId);
            const userList = await getUserList();

            const userObj: { [key: string]: UserInfo } = {};
            userList.forEach(user => {
                userObj[user.id] = user;
            })
            const result: SimpleListItemType[] = dialogs.map(item => {
                const otherUserId: string = item.userIds.find(id => id !== userId);
                const user = userObj[otherUserId];
                const imageBlob = user?.avatar;
                let link = '';
                if (imageBlob) {
                    const reader = new FileReader();
                    reader.readAsDataURL(imageBlob);
                    reader.onloadend = () => {
                        link = reader.result;
                    };
                }
                return {
                    avatar: link,
                    avatarHelperText: getUserInitials(user),
                    primaryText: getUserFIO(user),
                    secondaryText: format(getDateWithTimezone(item.lastMessageTime ?? new Date()), 'dd.MM.yyyy HH:ss') ?? '',
                    rightContent: <Box
                        style={css.rightContentStyle}
                    >
                        {item.lastMessageTime > item.lastVisitedTime &&
                            <IconMessage2Exclamation color={'white'} />
                        }
                        <DialogItemDropdownList dialogId={item.id} />
                    </Box>,
                }
            })
            setDialogList(result);
            setIsLoading(false);
        }
        catch {
            setIsError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!sessionParams?.userInfo.id)
            return;

        setIsLoading(true);
        getAllDialogList(sessionParams?.userInfo.id);
    }, [])

    useEffect(() => {
        setIsLoading(true);
        const result = dialogList
            ?.filter(item => !searchText || item.primaryText.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredDialogList(result);
        setIsLoading(false);
    }, [searchText, dialogList])

    return (
        <Box style={css.listWrap}>
            {!dialogList?.length && !isLoading && !isError &&
                <Text>Нет данных для отображения</Text>
            }
            {!filteredDialogList?.length && !!searchText && !isLoading && !isError &&
                <Text>Нет пользователей, удовлетворяющих указанным критериям</Text>
            }
            {!!dialogList?.length && !filteredDialogList?.length && isLoading && !isError &&
                <>
                    <Text>Идет загрузка</Text>
                </>
            }
            {!isLoading && !!filteredDialogList?.length &&
                <SimpleList
                    list={filteredDialogList}
                />
            }
            {!dialogList?.length && !isLoading && isError &&
                <Text>Произошла ошибка при загрузке данных. Попробуйте перезагрузить страницу или войдите позже</Text>
            }
        </Box>
    )
}