import { useState } from 'react';
import {
    Container,
    Paper,
} from '@mantine/core';
import { useForm } from "react-hook-form";
import { AuthorizationButton, AuthorizationSchema, ForgotPasswordButton } from '../../../features';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EmailInputWithValidation, PasswordInputWithValidation, routeData, SimpleButton } from '../../../shared';

export const AuthorizationForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const returnUrl = searchParams.get('returnUrl') ?? '';

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
                    returnUrl={returnUrl}
                />
                <SimpleButton
                    text={'Зарегистрироваться'}
                    onClick={handleRegistrationButtonClick}
                />
            </Paper>
        </Container>
    );
}