import { useState } from 'react';
import {
    Container,
    Paper,
} from '@mantine/core';
import { useForm } from "react-hook-form";
import { AuthorizationSchema } from '../config';
import { AuthorizationButton, EmailInputWithValidation, ForgotPasswordButton, PasswordInputWithValidation, RegistrationButton } from '../../../features';

export const AuthorizationForm = () => {
    const { register, handleSubmit } = useForm<AuthorizationSchema>();
    const [errorObj, setErrorObj] = useState<{ [key: string]: { message: string } }>();

    return (
        <Container size={420} my={40}>
            <Paper
                withBorder
                shadow="sm"
                p={22}
                mt={30}
                radius="md"
            >
                <EmailInputWithValidation
                    errorObj={errorObj}
                    register={register}
                />
                <PasswordInputWithValidation
                    errorObj={errorObj}
                    register={register}
                />

                <ForgotPasswordButton />
                <AuthorizationButton
                    handleSubmit={handleSubmit}
                    setErrorObj={(errorObj) => setErrorObj(errorObj)}
                />
                <RegistrationButton />
            </Paper>
        </Container>
    );
}