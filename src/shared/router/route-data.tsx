import { JSX } from "react"
import { AuthorizationPage } from "../../pages"

export type RouteObject = {
    label?: string,
    path: string,
    code: RouteCode,
    element: JSX.Element,
}

export enum RouteCode {
    Authorization = 'authorization',
    Registration = 'registration',
    ForgotPassword = 'forgot-password',
    Profile = 'profile',

}

export const routeData: { [key: string]: RouteObject } = {
    basePage: {
        label: 'Базовая страница',
        path: '/',
        code: RouteCode.Authorization,
        element: <AuthorizationPage />
    },
    authorizationPage: {
        label: 'Авторизация',
        path: '/login',
        code: RouteCode.Authorization,
        element: <AuthorizationPage />
    },
    registrationPage: {
        label: 'Регистрация',
        path: '/registration',
        code: RouteCode.Registration,
        element: <AuthorizationPage />
    },
    forgotPasswordPage: {
        label: 'Забыли пароль',
        path: '/forgot-password',
        code: RouteCode.ForgotPassword,
        element: <AuthorizationPage />
    },
    profilePage: {
        label: 'Профиль',
        path: '/profile',
        code: RouteCode.Profile,
        element: <></>
    },
}