import React from 'react';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { Header } from '../../header';
import './Layout.css';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return (
        <div className='layout'>
            <div
                className='contentWrap'
                style={{
                    background: mantineTheme.colors.background[colorScheme],
                }}
            >
                <Header />
                {children}
                {/* <Button
                    onClick={toggleColorScheme}>
                    111
                </Button> */}
            </div>
        </div>
    )
}