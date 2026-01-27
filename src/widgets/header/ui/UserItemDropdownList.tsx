import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core"
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

    const handleDialogButtonClick = () => {
        navigate(routeData.dialogPage.path)
    }

    return (
        <DropdownList
            targetButton={
                <Box>
                    <IconButton
                        variant={'subtle'}
                        icon={<IconMenu4 size={'large'} color={mantineTheme.colors.textColor[colorScheme]} />}
                        ariaLabel={'Написать сообщение'}
                    />
                </Box>
            }
            list={[
                {
                    text: 'Написать сообщение',
                    handleClick: handleDialogButtonClick,
                    leftIcon: <IconMessage size={14} />
                },
            ]}
        />
    )
}