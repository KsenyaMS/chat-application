import { IconMenu2 } from '@tabler/icons-react';
import { IconButton } from "../../../shared";
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

export const MenuButton = () => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return <IconButton
        variant={'subtle'}
        icon={<IconMenu2 size={'large'} color={mantineTheme.colors.textColor[colorScheme]} />}
        ariaLabel={'Menu'}
        onClick={() => { }}
    />
}