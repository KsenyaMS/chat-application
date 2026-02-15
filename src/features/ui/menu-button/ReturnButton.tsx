import { IconArrowLeft } from '@tabler/icons-react';
import { IconButton, routeData } from "../../../shared";
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const ReturnButton = () => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${routeData.dialogListPage.path}`);
    }

    return <IconButton
        variant={'subtle'}
        icon={<IconArrowLeft
            size={'large'}
            color={mantineTheme.colors.textColor[colorScheme]}
        />}
        ariaLabel={'Menu'}
        onClick={handleClick}
    />
}