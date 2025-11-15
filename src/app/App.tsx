import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { routeData, theme } from '../shared';
import { Layout, SessionProvider } from '../widgets';

export const App = () => {
    return <MantineProvider theme={theme}>
        <BrowserRouter>
            <SessionProvider>
                <Layout>
                    <Routes>
                        {routeData.map(route =>
                            <Route
                                path={route.path}
                                element={route.element}
                            />
                        )}
                    </Routes>
                </Layout>
            </SessionProvider>
        </BrowserRouter>
    </MantineProvider>
}