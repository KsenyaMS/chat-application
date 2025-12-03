import { useEffect, useState } from "react";
import { getUserList, UserInfo } from './../../features';
import { SimpleList } from "../../shared";

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
                <SimpleList
                    list={userList}
                />
            }
            {!userList?.length && !isLoading && isError &&
                <>Произошла ошибка при загрузке данных. Попробуйте перезагрузить страницу или войдите позже</>
            }
        </>
    )
}