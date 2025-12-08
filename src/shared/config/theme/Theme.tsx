import { createTheme, virtualColor } from "@mantine/core";

export enum ThemeType {
    Light = 'light',
    Dark = 'dark',
}

export const theme = createTheme({
    colors: {
        background: virtualColor({
            name: 'background',
            dark: '#111516',
            light: '#d7dcdf',
        }),
        textColor: virtualColor({
            name: 'textColor',
            dark: '#d7dcdf',
            light: 'black',
        }),
        // #8147fc
    },
})