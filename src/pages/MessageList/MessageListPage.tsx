import { useState } from "react"
import { SimpleTextField } from "../../shared";
import { Box } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import { MessageList } from "../../widgets";

export const MessageListPage = () => {
    const [search, setSearch] = useState<string>('');

    return <Box style={{ height: '100%' }}>
        <SimpleTextField
            icon={<IconSearch size={16} />}
            text="Поиск"
            onChange={(value) => setSearch(value)}
        />
        <MessageList searchText={search} />
    </Box>
}