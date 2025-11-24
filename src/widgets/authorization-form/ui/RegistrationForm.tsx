import { useState } from 'react';
import {
    Container,
    Paper,
} from '@mantine/core';
import { useForm } from "react-hook-form";
import { RegistrationSchema } from '../config';
import { EmailInputWithValidation, PasswordInputWithValidation, RegistrationButton, TextInputWithValidation } from '../../../features';
import { routeData, SimpleButton } from '../../../shared';
import { useNavigate } from 'react-router-dom';

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<RegistrationSchema>();
    const [errorObj, setErrorObj] = useState<{ [key: string]: { message: string } }>();

    const handleAuthorizationButtonClick = () => {
        navigate(routeData.authorizationPage.path);
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
                <EmailInputWithValidation
                    errorObj={errorObj}
                    register={register}
                />
                <PasswordInputWithValidation
                    errorObj={errorObj}
                    register={register}
                />
                <RegistrationButton
                    handleSubmit={handleSubmit}
                    setErrorObj={(errorObj) => setErrorObj(errorObj)}
                />
                <SimpleButton
                    text={'Войти по логину и паролю'}
                    onClick={handleAuthorizationButtonClick}
                />
            </Paper>
        </Container>
    );
}