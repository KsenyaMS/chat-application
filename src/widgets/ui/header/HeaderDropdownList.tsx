import { Box, useMantineTheme } from "@mantine/core"
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

    const handleUserListButtonClick = () => {
        navigate(routeData.userListPage.path)
    }

    const handleDialogListButtonClick = () => {
        navigate(routeData.dialogListPage.path)
    }

    const handleProfileButtonClick = () => {
        navigate(routeData.profilePage.path)
    }

    const handleDeleteUserButtonClick = () => {

    }

    return (
        <DropdownList
            targetButton={
                <Box>
                    <MenuButton />
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
                    handleClick: handleDialogListButtonClick,
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