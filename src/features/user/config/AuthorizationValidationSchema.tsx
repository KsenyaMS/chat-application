import { z } from 'zod';
import { emailRegexp } from './const';

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