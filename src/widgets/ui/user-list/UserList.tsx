import { useEffect, useState } from "react";
import { Box, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { CssComponent, format, SimpleAvatar, SimpleList, SimpleListItem } from "../../../shared";
import { UserItemDropdownList, userModel, UserModel, useSessionProvider } from "../../../features";

const css: CssComponent = {
    listWrap: { textAlign: 'center', height: '100%', alignContent: 'center' }
}

type UserListProps = {
    searchText?: string,
}

export const UserList = ({ searchText }: UserListProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [userList, setUserList] = useState<UserModel[]>([]);
    const [filteredUserList, setFilteredUserList] = useState<UserModel[]>([]);

    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const { sessionParams } = useSessionProvider();

    const getAllUserList = async () => {
        if (!sessionParams?.userInfo?.id)
            return;

        try {
            const list = await userModel.fetchUserList(sessionParams.userInfo.id);
            setUserList(list);
        }
        catch (err) {
            setIsError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getAllUserList();
    }, [])

    useEffect(() => {
        setIsLoading(true);
        const result = userList
            ?.filter(item => !searchText || item.FIO.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredUserList(result);
        setIsLoading(false);
    }, [searchText, userList])

    return (
        <Box style={css.listWrap}>
            {!userList?.length && !isLoading && !isError &&
                <Text>Нет данных для отображения</Text>
            }
            {!filteredUserList?.length && searchText && !isLoading && !isError &&
                <Text>Нет пользователей, удовлетворяющих указанным критериям</Text>
            }
            {(!userList?.length || !filteredUserList?.length) && isLoading && !isError &&
                <>
                    <Text>Идет загрузка</Text>
                </>
            }
            {!isLoading && !!filteredUserList?.length &&
                <SimpleList>
                    {filteredUserList.map((item, idx) =>
                        <SimpleListItem
                            key={idx}
                            primaryValue={item.FIO}
                            secondaryValue={format(new Date(), 'dd.MM.yyyy HH:mm')}
                            avatar={
                                <SimpleAvatar
                                    link={item.avatar}
                                    userName={item.initials}
                                    color={mantineTheme.colors.textColor[colorScheme]}
                                />
                            }
                            rightContent={<UserItemDropdownList />}
                        />
                    )}
                </SimpleList>
            }
            {!userList?.length && !isLoading && isError &&
                <Text>Произошла ошибка при загрузке данных. Попробуйте перезагрузить страницу или войдите позже</Text>
            }
        </Box>
    )
}