import { Box } from "@mantine/core"
import { CssComponent } from "../model"

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

export const SimpleListItem = () => {
    return (
        <Box style={css.wrap}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
        </Box>
    )
}