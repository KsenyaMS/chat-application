import { useState } from "react"
import { UserList } from "../../widgets";
import { CssComponent } from "../../shared";
import { Box } from "@mantine/core";

const css: CssComponent = {
    wrap: {
        padding: '5px 50px 5px 50px',
    }
}

export const UserListPage = () => {
    const [search, setSearch] = useState<string>('');

    return <Box style={css.wrap}>
        {/* <SearchField/> */}
        <UserList />
    </Box>
}