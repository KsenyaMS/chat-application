import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { routeData, theme } from '../shared';
import { Layout } from '../widgets';
import { SessionProvider } from '../features';

export const App = () => {
    return <MantineProvider theme={theme}>
        <BrowserRouter>
            <SessionProvider>
                <Layout>
                    <Routes>
                        {Object.keys(routeData).map(key =>
                            <Route
                                path={routeData[key].path}
                                element={routeData[key].element}
                            />
                        )}
                    </Routes>
                </Layout>
            </SessionProvider>
        </BrowserRouter>
    </MantineProvider>
}