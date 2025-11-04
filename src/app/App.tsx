import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from '../shared';
import { Layout } from '../widgets';
import { AuthorizationForm, useUserInfo } from '../widgets/authorization-form';
import { UserType } from '../features';

export const App = () => {
    const { user } = useUserInfo();

    return <MantineProvider theme={theme}>
        <BrowserRouter>
            <Layout>
                {user.userType === UserType.Guest &&
                    <AuthorizationForm />
                }
            </Layout>
        </BrowserRouter>
    </MantineProvider>
}