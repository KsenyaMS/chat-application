import { atom, useAtom } from 'jotai';
import { UserType } from '../../../features';

export type AuthorizationParams = {
    userType: UserType,
    id?: string,
}

const defaultUserParams: AuthorizationParams = {
    userType: UserType.Guest,
    id: undefined,
}

export const initialValue: AuthorizationParams = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : defaultUserParams;

export const authorizationAtom = atom<AuthorizationParams>(initialValue);

export function useUserInfo() {
    const [user, setUser] = useAtom(authorizationAtom);

    const logIn = (user: AuthorizationParams) => {
        setUser(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    const logOut = () => {
        setUser(defaultUserParams);
        localStorage.removeItem('userInfo');
    }

    return { user, logIn, logOut } as const;
}