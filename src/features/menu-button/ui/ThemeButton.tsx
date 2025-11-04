import { IconSunHigh, IconMoonStars } from '@tabler/icons-react';
import { IconButton, ThemeType } from "../../../shared";
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

export const ThemeButton = () => {
    const mantineTheme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const Icon = colorScheme === ThemeType.Dark
        ? IconSunHigh
        : IconMoonStars;

    return <IconButton
        variant={'subtle'}
        icon={<Icon size={'large'} color={mantineTheme.colors.textColor[colorScheme]} />}
        ariaLabel={'Change theme'}
        onClick={toggleColorScheme}
    />
}