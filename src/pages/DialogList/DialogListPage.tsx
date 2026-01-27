import { useState } from "react"
import { SimpleTextField } from "../../shared";
import { Box } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import { DialogList } from "../../widgets";

export const DialogListPage = () => {
    const [search, setSearch] = useState<string>('');

    return <Box style={{ height: '100%' }}>
        <SimpleTextField
            icon={<IconSearch size={16} />}
            text="Поиск"
            onChange={(value) => setSearch(value)}
        />
        <DialogList searchText={search} />
    </Box>
}