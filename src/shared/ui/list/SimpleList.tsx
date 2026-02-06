import { Box } from "@mantine/core";
import { CssComponent } from "../model";
import { ReactNode } from "react";

const css: CssComponent = {
    listWrap: {
        width: '100%',
        height: '100%',
        paddingBottom: '5px',
        marginTop: '10px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        overflowX: 'hidden',
    }
}

export type SimpleListProps = {
    children: ReactNode,
}

export const SimpleList = ({
    children
}: SimpleListProps) => {
    return <Box style={css.listWrap}>
        {children}
    </Box>
}