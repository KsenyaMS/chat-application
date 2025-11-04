import {
    Button,
} from '@mantine/core';

export const RegistrationButton = () => {
    return (
        <Button
            fullWidth
            mt="md"
            radius="md"
            data-testid="registration-button"
        >
            Зарегистрироваться
        </Button>
    );
}