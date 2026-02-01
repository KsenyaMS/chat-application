import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import {
    IconClearAll,
    IconMenu4
} from '@tabler/icons-react';
import { DropdownList, IconButton } from "../../shared";
import { messageService } from "../../api";

export const DialogItemDropdownList = ({ dialogId }: { dialogId: string }) => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    const handleDeleteDialog = async (id: string) => {
        try {
            await messageService.removeDialog(id);
        }
        catch {
            console.log('При попытке удалить диалог возникла ошибка!');
        }
    }

    return (
        <DropdownList
            targetButton={
                <Box>
                    <IconButton
                        variant={'subtle'}
                        icon={<IconMenu4 size={'large'} color={mantineTheme.colors.textColor[colorScheme]} />}
                        ariaLabel={'Варианты действий с выбранным диалогом'}
                    />
                </Box>
            }
            list={[
                {
                    text: 'Удалить диалог',
                    handleClick: () => handleDeleteDialog(dialogId),
                    leftIcon: <IconClearAll size={14} />
                },
            ]}
        />
    )
}