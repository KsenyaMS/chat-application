import { useEffect, useState } from "react";
import { CssComponent, SimpleList, SimpleListItemType } from "../../shared";
import { Box, Text } from "@mantine/core";

const css: CssComponent = {
    listWrap: { textAlign: 'center', height: '100%', alignContent: 'center' }
}

type MessageListProps = {
    searchText?: string,
}

export const MessageList = ({ searchText }: MessageListProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [dialogList, setMessageList] = useState<SimpleListItemType[]>([]);
    const [filteredMessageList, setFilteredMessageList] = useState<SimpleListItemType[]>([]);

    const getAllMessageList = async () => {
        return []
    }

    useEffect(() => {
        setIsLoading(true);
        getAllMessageList();
    }, [])

    useEffect(() => {
        setIsLoading(true);
        const result = dialogList
            ?.filter(item => !searchText || item.primaryText.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredMessageList(result);
        setIsLoading(false);
    }, [searchText, dialogList])

    return (
        <Box style={css.listWrap}>
            {!dialogList?.length && !isLoading && !isError &&
                <Text>Нет данных для отображения</Text>
            }
            {!filteredMessageList?.length && !!searchText && !isLoading && !isError &&
                <Text>Нет пользователей, удовлетворяющих указанным критериям</Text>
            }
            {!!dialogList?.length && !filteredMessageList?.length && isLoading && !isError &&
                <>
                    <Text>Идет загрузка</Text>
                </>
            }
            {!isLoading && !!filteredMessageList?.length &&
                <SimpleList
                    list={filteredMessageList}
                />
            }
            {!dialogList?.length && !isLoading && isError &&
                <Text>Произошла ошибка при загрузке данных. Попробуйте перезагрузить страницу или войдите позже</Text>
            }
        </Box>
    )
}