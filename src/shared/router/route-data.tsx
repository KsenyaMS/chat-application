import { JSX } from "react"
import { AuthorizationPage, DialogListPage, ProfilePage, UserListPage } from "../../pages"

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
    UserList = 'user-list',
    DialogList = 'dialog-list',
    Dialog = 'dialog',
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
        element: <ProfilePage/>
    },
    userListPage: {
        label: 'Список пользователей',
        path: '/user-list',
        code: RouteCode.UserList,
        element: <UserListPage />
    },
    dialogListPage: {
        label: 'Список сообщений',
        path: '/dialog-list',
        code: RouteCode.DialogList,
        element: <DialogListPage />
    },
    dialogPage: {
        label: 'Диалог',
        path: '/dialog/:dialogId',
        code: RouteCode.DialogList,
        element: <></>
    },
}