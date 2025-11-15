import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from '../shared';
import { AuthorizationForm, Layout, SessionProvider } from '../widgets';

export const App = () => {
    return <MantineProvider theme={theme}>
        <BrowserRouter>
            <SessionProvider>
                <Layout>
                    <Routes>
                        <Route path="*" element={<AuthorizationForm />} />
                        <Route path="login" element={<AuthorizationForm />} />
                        <Route path="profile" element={<></>} />
                    </Routes>
                </Layout>
            </SessionProvider>
        </BrowserRouter>
    </MantineProvider>
}