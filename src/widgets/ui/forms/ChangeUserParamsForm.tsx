import { useState } from 'react';
import {
    Container,
    Paper,
} from '@mantine/core';
import { useForm } from "react-hook-form";
import { ChangeUserParamsButton, ChangeUserParamsValidationSchema, ForgotPasswordButton, UserModel, useSessionProvider } from '../../../features';
import { CssComponent, EmailInputWithValidation, TextInputWithValidation } from '../../../shared';

const css: CssComponent = {
    container: {
        textAlign: 'left',
    },
}

type ChangeUserParamsFormProps = {
    userInfo: UserModel,
}

export const ChangeUserParamsForm = ({ userInfo }: ChangeUserParamsFormProps) => {
    const { register, handleSubmit } = useForm<ChangeUserParamsValidationSchema>({
        defaultValues: {
            firstName: userInfo.firstName ?? '',
            lastName: userInfo.lastName ?? '',
            email: userInfo.email ?? '',
        }
    });
    const [errorObj, setErrorObj] = useState<{ [key: string]: { message: string } }>();

    return (
        <Container
            size={420}
            my={40}
            mt={0}
            style={css.container}
        >
            <Paper
                withBorder
                shadow="sm"
                p={20}
                mt={20}
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
                <ChangeUserParamsButton
                    userInfo={userInfo}
                    handleSubmit={handleSubmit}
                    setErrorObj={(errorObj) => setErrorObj(errorObj)}
                />
                <ForgotPasswordButton />
            </Paper>
        </Container>
    );
}