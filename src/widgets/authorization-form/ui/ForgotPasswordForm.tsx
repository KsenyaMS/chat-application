import {
    Container,
    Paper,
} from '@mantine/core';
import { EmailInputWithValidation, PasswordInputWithValidation, TextInputWithValidation, UpdatePasswordButton } from '../../../features';
import { routeData, SimpleButton } from '../../../shared';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordSchema } from '../config';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const ForgotPasswordForm = () => {
    const { register, handleSubmit } = useForm<ForgotPasswordSchema>();
    const [errorObj, setErrorObj] = useState<{ [key: string]: { message: string } }>()

    const navigate = useNavigate();

    const handleAuthorizationButtonClick = () => {
        navigate(routeData.authorizationPage.path);
    }

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
                <TextInputWithValidation
                    errorObj={errorObj}
                    register={register}
                    code='firstName'
                    text='Имя'
                />
                <TextInputWithValidation
                    errorObj={errorObj}
                    register={register}
                    code='lastName'
                    text='Фамилия'
                />
                <PasswordInputWithValidation
                    errorObj={errorObj}
                    register={register}
                    code='firstPassword'
                />
                <PasswordInputWithValidation
                    errorObj={errorObj}
                    register={register}
                    code='secondPassword'
                />
                <UpdatePasswordButton
                    handleSubmit={handleSubmit}
                    setErrorObj={(errorObj) => setErrorObj(errorObj)}
                />
                <SimpleButton
                    text={'Зарегистрироваться'}
                    onClick={handleRegistrationButtonClick}
                />
                <SimpleButton
                    text={'Войти по логину и паролю'}
                    onClick={handleAuthorizationButtonClick}
                />
            </Paper>
        </Container>
    );
}