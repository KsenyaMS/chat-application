export type UserModel = {
    id?: string,
    email: string,
    firstName: string,
    lastName: string,
    secondName?: string,
    FIO: string,
    initials: string,
    avatar?: string,
    password: string,
}

export type UserObj = {
    [key: string]: UserModel,
}