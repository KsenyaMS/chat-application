import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { CssComponent } from "../model"
import { ReactElement } from "react"
import { ContainerWithTwoValues } from "./ContainerWithTwoValues"

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

type SimpleListItemProps = {
    avatar: ReactElement,
    rightContent?: ReactElement,
    primaryValue: string,
    secondaryValue?: string,
}

export const SimpleListItem = ({
    avatar,
    rightContent,
    primaryValue,
    secondaryValue,
}: SimpleListItemProps) => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const itemBackgroundIndex = colorScheme === 'light'
        ? 6
        : 7;

    return (
        <Box style={{ ...css.wrap, background: mantineTheme.colors.gray[itemBackgroundIndex] }}>
            <Box style={css.leftBlock}>
                {avatar && avatar}
                <ContainerWithTwoValues
                    primaryValue={primaryValue}
                    secondaryValue={secondaryValue ?? ''}
                />
            </Box>
            <Box>
                {rightContent && rightContent}
            </Box>
        </Box>
    )
}