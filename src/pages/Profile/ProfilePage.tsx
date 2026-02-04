import { useEffect, useState } from 'react';
import { UserModel, userModel, useSessionProvider } from "../../features";
import { Box, Text } from "@mantine/core";
import { CssComponent } from '../../shared';
import { ChangeableAvatar } from '../../widgets';

const css: CssComponent = {
    wrap: {
        overflowY: 'auto',
        maxHeight: '500px',
        height: '100%',
        width: '100%',
        
        alignContent: 'center',
        textAlign: 'center',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textField: {
        width: '300px',
        marginBottom: '10px',
    },
}

export const ProfilePage = () => {
    const {sessionParams} = useSessionProvider();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserModel | undefined>();

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    await userModel.updateUser({ ...userInfo, avatar: reader.result as string });
                    await getUserInfoById(userInfo?.id)
                }
                catch (error) {
                    console.log({error});
                    
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const getUserInfoById = async (userId: string) => {
        try {
            setIsLoading(true);
            const user = await userModel.fetchUserInfoById(userId);
            setUserInfo(user);
            setIsLoading(false);
        }
        catch (err) {
            console.log({err});
            console.log('При загрузке профиля возникла ошибка!');
            setIsLoading(false);
            setIsError(true);
        }
    }

    useEffect(() => {
        if (!sessionParams?.userInfo?.id)
            return;

        getUserInfoById(sessionParams.userInfo.id);
    }, [sessionParams?.userInfo?.id])

    return (
        <Box style={css.wrap}>
            {userInfo && !isLoading && !isError &&
                <ChangeableAvatar
                    avatar={userInfo.avatar}
                    initials={userInfo.initials}
                    handleAvatarChange={handleAvatarChange}
                />
            }
            {!userInfo && !isLoading && !isError &&
                <Text>Нет данных для отображения</Text>
            }
            {!userInfo && isLoading && !isError &&
                    <Text>Идет загрузка</Text>
            }
            {!userInfo && !isLoading && isError &&
                <Text>Произошла ошибка при загрузке данных. Попробуйте перезагрузить страницу или войдите позже</Text>
            }
        </Box>
    )
}