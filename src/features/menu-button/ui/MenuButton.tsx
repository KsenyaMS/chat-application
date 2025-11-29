import { IconMenu2 } from '@tabler/icons-react';
import { IconButton } from "../../../shared";
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

export type MenuButtonProps = {
    handleClick: () => void,
}

export const MenuButton = ({ handleClick }: MenuButtonProps) => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return <IconButton
        variant={'subtle'}
        icon={<IconMenu2 size={'large'} color={mantineTheme.colors.textColor[colorScheme]} />}
        ariaLabel={'Menu'}
        onClick={handleClick}
    />
}