import { getSession, SessionParams, signOut, UserType } from '../..';
import { createContext, JSX, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { routeData } from '../../../shared';

// Задержка для проверки бездействия пользователя 1 минута
const INTERVAL_DELAY_MS = 60000;
// Время действия токена 10 минут
const TOKEN_VALIDITY_PERIOD_MS = 60000;
// Время, через которое происходит выход пользователя из системы (20 минут)
const LOGOUT_TIME_MS = 120000;

let lastActivityTime: number | undefined = undefined;
let tokenReceiptTime: number | undefined = undefined;
let isUpdateTime: boolean = true;
let isTokenWasAutoUpdated: boolean = false;

export type SessionProviderType = {
    sessionParams?: SessionParams,
    userType?: UserType,
    logOut: () => Promise<void>,
    setToken: (token: string) => void,
}

const defaultUserParams: SessionProviderType = {
    sessionParams: {
        id: localStorage.getItem('token') ? localStorage.getItem('token') as string : undefined,
    },
    userType: UserType.Guest,
    logOut: () => Promise.resolve(),
    setToken: () => { },
}

export const SessionContext = createContext<SessionProviderType>(defaultUserParams);

export type SessionProviderProps = {
    children?: React.ReactNode,
};

export const SessionProvider = ({ children }: SessionProviderProps): JSX.Element => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [sessionParams, setSessionParams] = useState<SessionParams | undefined>(defaultUserParams.sessionParams);
    const [userType, setUserType] = useState<UserType>(UserType.Guest);

    const refreshSession = useCallback(async () => {
        try {
            const session = await getSession(sessionParams?.id);
            setSessionParams(session);
            setUserType(UserType.User);

            if (isUpdateTime) {
                const dateNow = new Date().getTime();
                lastActivityTime = dateNow;
                tokenReceiptTime = dateNow;
                isTokenWasAutoUpdated = false;
            }
            isUpdateTime = true;
        }
        catch {
            await logOut();
        }
    }, []);

    const logOut = useCallback(async () => {
        if (sessionParams?.id) {
            await signOut(sessionParams.id);
        }
        setUserType(UserType.Guest);
        localStorage.removeItem('token');
        setSessionParams(defaultUserParams.sessionParams);

        const params = new URLSearchParams();
        params.append('returnUrl', window.location.href);
        navigate(`${routeData.authorizationPage.path}?${params.toString()}`);
    }, []);

    const setToken = (token: string) => {
        setSessionParams(prev => ({ ...prev, id: token }));
        localStorage.setItem('token', token);
        setUserType(UserType.User);
    }

    useEffect(() => {
        lastActivityTime = new Date().getTime();
        isTokenWasAutoUpdated = false;
    }, [pathname]);

    useEffect(() => {
        if (!sessionParams)
            return;

        const interval = setInterval(() => {
            const dateNow = new Date().getTime();
            if (!!tokenReceiptTime && dateNow - tokenReceiptTime >= TOKEN_VALIDITY_PERIOD_MS) {
                if (!!lastActivityTime && dateNow - lastActivityTime >= LOGOUT_TIME_MS) {
                    tokenReceiptTime = undefined;
                    lastActivityTime = undefined;
                    logOut();
                }
                else if (!isTokenWasAutoUpdated) {
                    isTokenWasAutoUpdated = true;
                    isUpdateTime = false;
                    tokenReceiptTime = lastActivityTime;
                    refreshSession();
                }
            }
        }, INTERVAL_DELAY_MS);

        return () => clearInterval(interval);
    }, [sessionParams, refreshSession, signOut]);

    useEffect(() => {
        refreshSession();
    }, [refreshSession]);

    return (
        <SessionContext.Provider
            value={{
                userType,
                sessionParams,
                logOut,
                setToken,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export const useSessionProvider = (): SessionProviderType => React.useContext(SessionContext);