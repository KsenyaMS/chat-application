import {
    Button,
} from '@mantine/core';
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import z from 'zod';
import { createUser } from '../../../api/user/user-service';
import { ChangeUserParamsValidationSchema, useSessionProvider } from '../../config';
import { UserModel, userModel } from '../../model';

type ChangeUserParamsButtonProps = {
    userInfo: UserModel,
    handleSubmit: UseFormHandleSubmit<ChangeUserParamsValidationSchema>,
    setErrorObj: (errObj: { [key: string]: { message: string } }) => void,
}

export const ChangeUserParamsButton = ({ userInfo, handleSubmit, setErrorObj }: ChangeUserParamsButtonProps) => {
    const onSubmit: SubmitHandler<ChangeUserParamsValidationSchema> = async (data) => {
        try {
            const res = await ChangeUserParamsValidationSchema.parseAsync(data);
            await userModel.updateUser({ ...userInfo, ...res });
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
            Сохранить
        </Button>
    );
}