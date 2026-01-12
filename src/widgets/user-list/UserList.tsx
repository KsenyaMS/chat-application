import { useEffect, useState } from "react";
import { getUserList } from './../../features';
import { format, getDateWithTimezone, getUserFIO, getUserInitials, SimpleList, SimpleListItemType } from "../../shared";

export const UserList = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [userList, setUserList] = useState<SimpleListItemType[]>([]);
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
                    }
                })
                setUserList(data);
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