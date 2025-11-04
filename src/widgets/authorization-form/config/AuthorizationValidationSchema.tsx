import { z } from 'zod';

const emailRegexp = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$');

export const AuthorizationSchema = z.object({
    email: z
        .string({
            error: 'Email - обязательное поле',
        })
        .trim()
        .regex(emailRegexp, 'Email должен соответствовать шаблону: user_name@mail.ru')
        .max(32, 'Email должен быть короче 32 символов'),
    password: z
        .string({
            error: 'Пароль - обязательное поле',
        })
        .trim()
        .min(8, 'Пароль должен быть длиннее 8 символов')
        .max(32, 'Пароль должен быть короче 32 символов'),
});

export type AuthorizationSchema = z.infer<typeof AuthorizationSchema>;