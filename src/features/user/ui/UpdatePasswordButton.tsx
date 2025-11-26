import {
    Button,
} from '@mantine/core';
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import z from 'zod';
import { changePassword, getSession } from '../model';
import { useNavigate } from 'react-router-dom';
import { routeData } from '../../../shared';
import { ForgotPasswordSchema, useSessionProvider } from '../config';

export type UpdatePasswordButtonProps = {
    handleSubmit: UseFormHandleSubmit<ForgotPasswordSchema>,
    setErrorObj: (errObj: { [key: string]: { message: string } }) => void,
}

export const UpdatePasswordButton = ({ handleSubmit, setErrorObj }: UpdatePasswordButtonProps) => {
    const navigate = useNavigate();
    const { setToken } = useSessionProvider();
    const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data) => {
        try {
            const res = await ForgotPasswordSchema.parseAsync(data);
            // const passwordHash = md5(data.password);
            const token = await changePassword({ ...res, password: res.firstName });

            await getSession(token);
            setToken(token);
            navigate(routeData.profilePage.path);
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
            Сохранить
        </Button>
    );
}