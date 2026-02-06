import React from 'react';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import './Layout.css';
import { CssComponent } from '../../../shared';
import { Header } from '../header';

const css: CssComponent = {
    wrap: {
        padding: '5px 50px 5px 50px',
        height: '90%',
    }
}

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
                <div style={css.wrap}>
                    {children}
                </div>
            </div>
        </div>
    )
}