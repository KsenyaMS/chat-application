import { useState } from "react"
import { UserList } from "../../widgets";
import { CssComponent } from "../../shared";
import { Box } from "@mantine/core";

export const UserListPage = () => {
    const [search, setSearch] = useState<string>('');

    return <Box style={{ height: '100%' }}>
        {/* <SearchField/> */}
        <UserList />
    </Box>
}