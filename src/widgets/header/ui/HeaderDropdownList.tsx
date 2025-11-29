import { Box, Menu, useMantineTheme } from "@mantine/core"
import { useState } from "react";
import { MenuButton } from "../../../features";
import {
    IconUsersGroup,
    IconMessageCircle,
    IconTrash,
    IconUser
} from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";
import { routeData } from "../../../shared";

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
        <Menu
            opened={isDropdownListOpen}
            shadow="md"
            position="bottom-start"
            width={220}
        >
            <Menu.Target>
                <Box>
                    <MenuButton handleClick={() => setIsDropdownListOpen(prev => !prev)} />
                </Box>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={<IconUser size={14} />}
                    onClick={handleProfileButtonClick}
                >
                    Профиль
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconUsersGroup size={14} />}
                    onClick={handleUserListButtonClick}
                >
                    Список пользователей
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconMessageCircle size={14} />}
                    onClick={handleMessageListButtonClick}
                >
                    Сообщения
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    color={mantineTheme.colors.red[8]}
                    leftSection={<IconTrash size={14} />}
                    onClick={handleDeleteUserButtonClick}
                >
                    Удалить аккаунт
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}