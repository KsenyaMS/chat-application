import { Box, Text, Tooltip, useMantineColorScheme, useMantineTheme } from "@mantine/core"

type ContainerWithTwoValuesProps = {
    primaryValue: string,
    secondaryValue: string,
    primaryValueTooltip?: string,
    secondaryValueTooltip?: string,
}

export const ContainerWithTwoValues = ({
    primaryValue,
    secondaryValue,
    primaryValueTooltip,
    secondaryValueTooltip,
}: ContainerWithTwoValuesProps) => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return <Box style={{ textAlign: 'left' }}>
        <Tooltip
            label={primaryValueTooltip}
            disabled={!primaryValueTooltip}
        >
            <Text
                c={mantineTheme.colors.textColor[colorScheme]}
            >
                {primaryValue}
            </Text>
        </Tooltip>
        <Tooltip
            label={secondaryValueTooltip}
            disabled={!secondaryValueTooltip}
        >
            <Text
                c={mantineTheme.colors.gray[5]}
            >
                {secondaryValue}
            </Text>
        </Tooltip>
    </Box>
}