import {
    Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { createUser, getSession } from '../model';
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import z from 'zod';
import { routeData } from '../../../shared';
import { RegistrationSchema, useSessionProvider } from '../config';

type RegistrationButtonProps = {
    handleSubmit: UseFormHandleSubmit<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }, {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }>,
    setErrorObj: (errObj: { [key: string]: { message: string } }) => void,
}

export const RegistrationButton = ({ handleSubmit, setErrorObj }: RegistrationButtonProps) => {
    const navigate = useNavigate();
    const { setToken } = useSessionProvider();

    const onSubmit: SubmitHandler<RegistrationSchema> = async (data) => {
        try {
            const res = await RegistrationSchema.parseAsync(data);
            // const passwordHash = md5(data.password);
            const token = await createUser(res);
            await getSession(token);
            setToken(token);
            navigate(routeData.forgotPasswordPage.path);
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
                setErrorObj && setErrorObj(errObj);
            }
        }
    }

    return (
        <Button
            fullWidth
            mt="md"
            radius="md"
            data-testid="registration-button"
            onClick={handleSubmit(onSubmit)}
        >
            Зарегистрироваться
        </Button>
    );
}