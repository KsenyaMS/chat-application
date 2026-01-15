import { useState } from "react"
import { UserList } from "../../widgets";
import { SimpleTextField } from "../../shared";
import { Box } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';

export const UserListPage = () => {
    const [search, setSearch] = useState<string>('');

    return <Box style={{ height: '100%' }}>
        <SimpleTextField
            icon={<IconSearch size={16} />}
            text="Поиск"
            onChange={(value) => setSearch(value)}
        />
        <UserList searchText={search} />
    </Box>
}