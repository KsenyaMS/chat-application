import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <SnackbarProvider>
        <App />
    </SnackbarProvider>
)
