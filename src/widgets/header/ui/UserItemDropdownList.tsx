import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { useState } from "react";
import {
    IconMessage,
    IconMenu4
} from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";
import { DropdownList, IconButton, routeData } from "../../../shared";

export const UserItemDropdownList = () => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const navigate = useNavigate();
    const [isDropdownListOpen, setIsDropdownListOpen] = useState<boolean>(false);

    const handleMessageListButtonClick = () => {
        navigate(routeData.messageListPage.path)
    }

    return (
        <DropdownList
            isDropdownListOpen={isDropdownListOpen}
            targetButton={
                <Box>
                    <IconButton
                        variant={'subtle'}
                        icon={<IconMenu4 size={'large'} color={mantineTheme.colors.textColor[colorScheme]} />}
                        ariaLabel={'Log out'}
                        onClick={() => setIsDropdownListOpen(prev => !prev)}
                    />
                </Box>
            }
            list={[
                {
                    text: 'Написать сообщение',
                    handleClick: handleMessageListButtonClick,
                    leftIcon: <IconMessage size={14} />
                },
            ]}
        />
    )
}