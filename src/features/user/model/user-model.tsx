import axios from "axios";
import { BASE_URL } from "../../../shared";
import { AuthorizationParams, SessionParams, UserInfo } from "./user-model.types";
import md5 from 'md5';

const getUserList = async () => {
    try {
        return (await axios.get<UserInfo[]>(`${BASE_URL}/user`)).data;
    }
    catch {
        throw new Error('При авторизации пользователя возникла ошибка!');
    };
}

export const singIn = async (params: AuthorizationParams) => {
    try {
        const userList = await getUserList();
        const user = userList?.find(item => item.email === params.email && item.password === params.password);

        if (!user) {
            throw new Error('Неверное имя пользователя или пароль!');
        }

        const token = md5(`${user.id}_${user.password}`);
        const userInfo = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            secondName: user.secondName,
            email: user.email,
        }

        await createSession({ userInfo, id: token })
        return token;
    }
    catch {
        throw new Error('При авторизации пользователя возникла ошибка!');
    };
}

export const createSession = async (params: SessionParams) => {
    try {
        await axios.post(`${BASE_URL}/session`, params)
    }
    catch {
        throw new Error('При создании сессии возникла ошибка!');
    }
}

export const signOut = async (token: string | number) => {
    try {
        return await axios.delete(`${BASE_URL}/session/${token}`);
    }
    catch {
        throw new Error('При выходе из аккаунта возникла ошибка!');
    };
}

export const getSession = async (token: string | undefined) => {
    try {
        return (await axios.get<SessionParams>(`${BASE_URL}/session/${token}`)).data;
    }
    catch {
        throw new Error('При получении данных о сессии возникла ошибка!');
    }
}

export const createUser = async (params: UserInfo) => {
    try {
        const userList = await getUserList();
        const user = userList?.find(item => item.email === params.email || item.firstName === params.firstName);

        if (user) {
            throw new Error('Пользователь с такими данными уже существует! Измените имя или email.');
        }

        const id = (await axios.post(`${BASE_URL}/user`, params)).data;
        const token = md5(`${id}_${params.password}`);

        await createSession({ userInfo: { ...params, id }, id: token })

        return token;
    }
    catch {
        throw new Error('При создании сессии возникла ошибка!');
    }
}