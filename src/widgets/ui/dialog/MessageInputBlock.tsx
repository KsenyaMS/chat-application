import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { CssComponent } from "../../../shared";

const css: CssComponent = {
    wrap: {
        height: '80px',
        width: '100% !important',
        borderRadius: '10px',
        marginTop: 'auto',
    },
}
export const MessageInputBlock = () => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return (
        <Box
            style={{
                ...css.wrap,
                background: mantineTheme.colors.background[colorScheme],
            }}
        >
            {/* Блок для ввода текста */}
        </Box>
    )
}