import { JSX } from "react"
import { AuthorizationForm, RegistrationForm } from "../../widgets"

export type RouteObject = {
    label?: string,
    path: string,
    code: RouteCode,
    element: JSX.Element,
}

export enum RouteCode {
    Authorization = 'authorization',
    Registration = 'registration',
    Profile = 'profile',

}

export const routeData: RouteObject[] = [
    {
        label: 'Базовая страница',
        path: '/',
        code: RouteCode.Registration,
        element: <AuthorizationForm />
    },
    {
        label: 'Авторизация',
        path: '/login',
        code: RouteCode.Authorization,
        element: <AuthorizationForm />
    },
    {
        label: 'Регистрация',
        path: '/registration',
        code: RouteCode.Registration,
        element: <RegistrationForm />
    },
    {
        label: 'Профиль',
        path: '/profile',
        code: RouteCode.Profile,
        element: <></>
    },
]