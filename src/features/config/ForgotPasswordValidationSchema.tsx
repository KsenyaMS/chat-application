import { z } from 'zod';
import { emailRegexp } from './const';

export const ForgotPasswordSchema = z.object({
    email: z
        .string({
            error: 'Email - обязательное поле',
        })
        .trim()
        .regex(emailRegexp, 'Email должен соответствовать шаблону: user_name@mail.ru')
        .max(32, 'Email должен быть короче 32 символов'),
    firstName: z
        .string({
            error: 'Имя - обязательное поле',
        })
        .trim()
        .min(3, 'Имя должно быть длиннее 3 символов')
        .max(32, 'Имя должно быть короче 32 символов'),
    lastName: z
        .string({
            error: 'Фамилия - обязательное поле',
        })
        .trim()
        .min(3, 'Фамилия должна быть длиннее 3 символов')
        .max(32, 'Фамилия должна быть короче 32 символов'),
    firstPassword: z
        .string({
            error: 'Пароль - обязательное поле',
        })
        .trim()
        .min(8, 'Пароль должен быть длиннее 8 символов')
        .max(32, 'Пароль должен быть короче 32 символов'),
    secondPassword: z
        .string({
            error: 'Повторите пароль',
        })
        .trim()
}).refine((data) => data.firstPassword === data.secondPassword, { message: 'Пароли должны совпадать', path: ['secondPassword'] });

export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;