import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { CssComponent } from "../model"
import { DropdownItem } from "./DropdownList"
import { ReactElement } from "react"
import { SimpleAvatar } from "./SimpleAvatar"
import { ContainerWithTwoValues } from "./ContainerWithTwoValues"
import { UserItemDropdownList } from "../../widgets"

const css: CssComponent = {
    wrap: {
        width: '100%',
        height: '60px',
        borderRadius: '8px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    leftBlock: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 35,
        alignItems: 'center',
    }
}

export type SimpleListItemType = {
    avatar: string,
    primaryText: string,
    secondaryText?: string,
    avatarHelperText?: string,
    rightContent?: ReactElement,
}

type SimpleListItemProps = {
    listItem: SimpleListItemType
}

export const SimpleListItem = ({
    listItem
}: SimpleListItemProps) => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const itemBackgroundIndex = colorScheme === 'light'
        ? 6
        : 7;

    return (
        <Box style={{ ...css.wrap, background: mantineTheme.colors.gray[itemBackgroundIndex] }}>
            <Box style={css.leftBlock}>
                <SimpleAvatar
                    link={listItem.avatar}
                    userName={listItem.avatarHelperText}
                    color={mantineTheme.colors.textColor[colorScheme]}
                />
                <ContainerWithTwoValues
                    primaryValue={listItem.primaryText}
                    secondaryValue={listItem.secondaryText ?? ''}
                />
            </Box>
            <Box>
                {listItem?.rightContent && listItem.rightContent}
            </Box>
        </Box>
    )
}