import { Box, Menu, useMantineTheme } from "@mantine/core"
import { useState } from "react";
import { MenuButton } from "../../../features";
import {
    IconUsersGroup,
    IconTrash,
    IconUser,
    IconMessage
} from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";
import { DropdownList, routeData } from "../../../shared";

export const HeaderDropdownList = () => {
    const navigate = useNavigate();
    const mantineTheme = useMantineTheme();
    const [isDropdownListOpen, setIsDropdownListOpen] = useState<boolean>(false);

    const handleUserListButtonClick = () => {
        navigate(routeData.userListPage.path)
    }

    const handleMessageListButtonClick = () => {
        navigate(routeData.messageListPage.path)
    }

    const handleProfileButtonClick = () => {
        navigate(routeData.profilePage.path)
    }

    const handleDeleteUserButtonClick = () => {

    }

    return (
        <DropdownList
            isDropdownListOpen={isDropdownListOpen}
            targetButton={
                <Box>
                    <MenuButton handleClick={() => setIsDropdownListOpen(prev => !prev)} />
                </Box>
            }
            list={[
                {
                    text: 'Профиль',
                    handleClick: handleProfileButtonClick,
                    leftIcon: <IconUser size={14} />
                },
                {
                    text: 'Список пользователей',
                    handleClick: handleUserListButtonClick,
                    leftIcon: <IconUsersGroup size={14} />
                },
                {
                    text: 'Сообщения',
                    handleClick: handleMessageListButtonClick,
                    leftIcon: <IconMessage size={14} />
                },
                {
                    text: 'Удалить аккаунт',
                    handleClick: handleDeleteUserButtonClick,
                    color: mantineTheme.colors.red[8],
                    leftIcon: <IconTrash size={14} />
                }
            ]}
        />
    )
}