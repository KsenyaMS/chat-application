import { z } from 'zod';
import { emailRegexp } from './const';

export const RegistrationSchema = z.object({
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
});

export type RegistrationSchema = z.infer<typeof RegistrationSchema>;