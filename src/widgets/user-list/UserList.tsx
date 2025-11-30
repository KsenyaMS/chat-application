import { useEffect, useState } from "react";
import { getUserList, UserInfo, UserListItem } from './../../features';
import { Box } from "@mantine/core";
import { CssComponent } from "../../shared";

const css: CssComponent = {
    listWrap: {
    }
}

export const UserList = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [userList, setUserList] = useState<UserInfo[]>([]);
    console.log({ userList });


    const getAllUserList = async () => {
        return getUserList()
            .then(res => {
                setUserList(res);
            })
            .catch(err => {
                console.log({ err });
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        setIsLoading(true);
        getAllUserList();
    }, [])

    return (
        <>
            {!userList?.length && !isLoading && !isError &&
                <>Нет данных для отображения</>
            }
            {!userList?.length && isLoading && !isError &&
                <>Идет загрузка</>
            }
            {!isLoading && userList?.length &&
                <Box style={css.listWrap}>
                    {userList.map(userInfo =>
                        <UserListItem />
                    )}
                </Box>
            }
            {!userList?.length && !isLoading && isError &&
                <>Произошла ошибка при загрузке данных. Попробуйте перезагрузить страницу или войдите позже</>
            }
        </>
    )
}