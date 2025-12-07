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
        height: '50px',
        background: 'green',
        borderRadius: '8px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '10px',
        paddingLeft: '10px'
    }
}

export type SimpleListItem = {
    avatar: string,
    primaryText: string,
    secondaryText?: string,
    dropdownList?: DropdownItem[],
    dropdownTargetButton?: ReactElement,
}

type SimpleListItemProps = {
    listItem: SimpleListItem
}

export const SimpleListItem = ({
    listItem
}: SimpleListItemProps) => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return (
        <Box style={css.wrap}>
            <Box>
                <SimpleAvatar color={mantineTheme.colors.textColor[colorScheme]} />
            </Box>
            <Box>
                <ContainerWithTwoValues
                    primaryValue={'123'}
                    secondaryValue={'321'}
                    primaryValueTooltip={'111'}
                />
            </Box>
            <Box>
                <UserItemDropdownList />
            </Box>
        </Box>
    )
}