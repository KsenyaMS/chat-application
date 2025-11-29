import {
    Button,
} from '@mantine/core';
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import z from 'zod';
import md5 from 'md5';
import { getSession, singIn } from '../model';
import { useNavigate } from 'react-router-dom';
import { routeData } from '../../../shared';
import { AuthorizationSchema, useSessionProvider } from '../config';

export type AuthorizationFormProps = {
    handleSubmit: UseFormHandleSubmit<{
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>,
    setErrorObj: (errObj: { [key: string]: { message: string } }) => void,
    returnUrl?: string,
}

export const AuthorizationButton = ({ handleSubmit, setErrorObj, returnUrl }: AuthorizationFormProps) => {
    const navigate = useNavigate();
    const { setToken } = useSessionProvider();
    const onSubmit: SubmitHandler<AuthorizationSchema> = async (data) => {
        try {
            const res = await AuthorizationSchema.parseAsync(data);
            // const passwordHash = md5(data.password);
            const token = await singIn({ email: res.email, password: res.password });
            await getSession(token);
            setToken(token);
            if (returnUrl) {
                window.location.href = returnUrl;
                return;
            }
            navigate(`${routeData.profilePage.path}`);
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