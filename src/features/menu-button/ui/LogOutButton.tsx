import { IconLogout } from '@tabler/icons-react';
import { IconButton } from "../../../shared";
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

export const LogOutButton = () => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return <IconButton
        variant={'subtle'}
        icon={<IconLogout size={'large'} color={mantineTheme.colors.textColor[colorScheme]} />}
        ariaLabel={'Log out'}
        onClick={() => { }}
    />
}