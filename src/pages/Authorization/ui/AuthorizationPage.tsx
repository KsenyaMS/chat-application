import React from 'react';
import { useMantineTheme, useMantineColorScheme, Button } from '@mantine/core';

const css: { [key: string]: any } = {
    layout: {
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrap: {
        width: '850px',
        minWidth: '700px',
        maxWidth: '1000px',
        height: '550px',
        minHeight: '400px',
        maxHeight: '600px',
        overflowY: 'auto',
        borderRadius: '10px',
    }
}

export const AuthorizationPage = () => {
    const mantineTheme = useMantineTheme();

    return (
        <div>
        </div>
    )
}