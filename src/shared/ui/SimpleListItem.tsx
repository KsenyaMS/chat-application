import { Box } from "@mantine/core"
import { CssComponent } from "../model"
import { DropdownItem } from "./DropdownList"
import { ReactElement } from "react"

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
        marginTop: '10px'
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
    return (
        <Box style={css.wrap}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
        </Box>
    )
}