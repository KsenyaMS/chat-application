import { useState } from 'react';
import {
    Anchor,
    Button,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import z from 'zod';
import { ForgotPasswordButton, RegistrationButton } from '../../../features';
import { AuthorizationSchema } from '../../../widgets/authorization-form';
import md5 from 'md5';

export type AuthorizationFormProps = {
    handleSubmit: UseFormHandleSubmit<{
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>,
    setErrorObj: (errObj: { [key: string]: { message: string } }) => void,
}

export const AuthorizationButton = ({ handleSubmit, setErrorObj }: AuthorizationFormProps) => {
    const onSubmit: SubmitHandler<AuthorizationSchema> = async (data) => {
        console.log({ data });

        try {
            const res = await AuthorizationSchema.parseAsync(data);
            console.log({ res });

            const passwordHash = md5(data.password);
            // const correctUser = userList
            //     .find(item => item.email === data.email && item.password === passwordHash);

            // if (!correctUser) {
            //     setErrorObj({
            //         auth: {
            //             message: 'Неверное имя пользователя или пароль'
            //         }
            //     })
            //     return;
            // }

            // const params: User = {
            //     userType: UserType.User,
            //     id: correctUser.id,
            // }
            // handleAuthorizationButtonClick(params);
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                const errList = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
                const errObj = {};
                errList.forEach(error => {
                    errObj[error.path] = {
                        message: error.message
                    }
                })
                setErrorObj(errObj);
            }
        }
    }

    return (
        <Button
            fullWidth
            mt="md"
            radius="md"
            onClick={handleSubmit(onSubmit)}
        >
            Войти
        </Button>
    );
}