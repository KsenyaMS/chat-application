export enum UserType {
    User = 'user',
    Guest = 'guest',
}

export type AuthorizationParams = {
    email: string,
    password: string,
}

export type UserInfo = {
    id?: string,
    email: string,
    firstName: string,
    lastName: string,
    secondName?: string,
    password: string,
    avatar?: string
}

export type SessionParams = {
    id: string,
    userInfo: Omit<UserInfo, 'password'> & {
        lastActivityDate: number,
    },
}