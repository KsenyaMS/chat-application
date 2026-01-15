import { useEffect, useState } from "react";
import { getUserList } from './../../features';
import { CssComponent, format, getDateWithTimezone, getUserFIO, getUserInitials, SimpleList, SimpleListItemType } from "../../shared";
import { UserItemDropdownList } from "../header";
import { Box, Text } from "@mantine/core";

const css: CssComponent = {
    listWrap: { textAlign: 'center', height: '100%', alignContent: 'center' }
}

type UserListProps = {
    searchText?: string,
}

export const UserList = ({ searchText }: UserListProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [userList, setUserList] = useState<SimpleListItemType[]>([]);
    const [filteredUserList, setFilteredUserList] = useState<SimpleListItemType[]>([]);
    console.log({ userList });


    const getAllUserList = async () => {
        return getUserList()
            .then(res => {
                const data: SimpleListItemType[] = res?.map(userInfo => {
                    const imageBlob = userInfo?.avatar;
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
                        avatarHelperText: getUserInitials(userInfo),
                        primaryText: getUserFIO(userInfo),
                        secondaryText: format(getDateWithTimezone(userInfo.lastActivityDate ?? new Date()), 'dd.MM HH:ss') ?? '',
                        rightContent: <UserItemDropdownList />
                    }
                })
                setUserList(data);
            })
            .catch(err => {
                console.log({ err });
                setIsError(true);
            });
    }

    useEffect(() => {
        setIsLoading(true);
        getAllUserList();
    }, [])

    useEffect(() => {
        setIsLoading(true);
        const result = userList
            ?.filter(item => !searchText || item.primaryText.toLowerCase().includes(searchText.toLowerCase()));
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
            {userList?.length && !filteredUserList?.length && isLoading && !isError &&
                <>
                    <Text>Идет загрузка</Text>
                </>
            }
            {!isLoading && !!filteredUserList?.length &&
                <SimpleList
                    list={filteredUserList}
                />
            }
            {!userList?.length && !isLoading && isError &&
                <Text>Произошла ошибка при загрузке данных. Попробуйте перезагрузить страницу или войдите позже</Text>
            }
        </Box>
    )
}