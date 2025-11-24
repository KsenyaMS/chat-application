import { useState } from 'react';
import {
    Container,
    Paper,
} from '@mantine/core';
import { useForm } from "react-hook-form";
import { AuthorizationSchema } from '../config';
import { AuthorizationButton, EmailInputWithValidation, ForgotPasswordButton, PasswordInputWithValidation } from '../../../features';
import { useNavigate } from 'react-router-dom';
import { routeData, SimpleButton } from '../../../shared';

export const AuthorizationForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<AuthorizationSchema>();
    const [errorObj, setErrorObj] = useState<{ [key: string]: { message: string } }>();

    const handleRegistrationButtonClick = () => {
        navigate(routeData.registrationPage.path);
    }

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
                <SimpleButton
                    text={'Зарегистрироваться'}
                    onClick={handleRegistrationButtonClick}
                />
            </Paper>
        </Container>
    );
}