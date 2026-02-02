import { useEffect, useState } from 'react';
import { UserModel, userModel, useSessionProvider } from "../../features";
import { Box, Text } from "@mantine/core";
import { CssComponent } from '../../shared';

const css: CssComponent = {
    wrap: {
        overflowY: 'auto',
        maxHeight: '500px',
    }
}

export const ProfilePage = () => {
    const {sessionParams} = useSessionProvider();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserModel | undefined>();

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
        }
    }

    useEffect(() => {
        if (!sessionParams?.userInfo.id)
            return;

        getUserInfoById(sessionParams.userInfo.id);
    }, [sessionParams?.userInfo.id])

    return (
        <Box style={css.wrap}>
            <Text>{userInfo.FIO}</Text>
        </Box>
    )
}