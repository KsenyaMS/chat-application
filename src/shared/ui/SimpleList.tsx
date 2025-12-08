import { Box } from "@mantine/core";
import { SimpleListItem, SimpleListItemType } from "./SimpleListItem";
import { CssComponent } from "../model";

const css: CssComponent = {
    listWrap: {
        width: '100%',
        height: '100%',
        // background: 'yellow',
        paddingBottom: '5px',
        marginTop: '10px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        overflowX: 'hidden',
    }
}

export type SimpleListProps = {
    list: SimpleListItemType[],
}

export const SimpleList = ({
    list
}: SimpleListProps) => {
    return <Box style={css.listWrap}>
        {list.map((item, idx) =>
            <SimpleListItem
                key={idx}
                listItem={item}
            />
        )}
    </Box>
}