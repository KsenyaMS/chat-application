import {
    Button,
} from '@mantine/core';
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import z from 'zod';
import md5 from 'md5';
import { signIn } from '../../../api/user/user-service';
import { AuthorizationSchema, useSessionProvider } from '../../config';

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
    const { setToken } = useSessionProvider();
    const onSubmit: SubmitHandler<AuthorizationSchema> = async (data) => {
        try {
            const res = await AuthorizationSchema.parseAsync(data);
            // const passwordHash = md5(data.password);
            const token = await signIn({ email: res.email, password: res.password });

            setToken(token);
            if (returnUrl) {
                window.location.href = returnUrl;
                return;
            }
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