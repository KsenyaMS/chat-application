import {
    Button,
} from '@mantine/core';

type SimpleButtonProps = {
    text: string,
    onClick: () => void,
    styles?: any,
}

export const SimpleButton = ({
    text,
    onClick,
    styles,
}: SimpleButtonProps) => {

    return (
        <Button
            fullWidth
            mt="md"
            radius="md"
            onClick={onClick}
            style={styles}
        >
            {text}
        </Button>
    );
}