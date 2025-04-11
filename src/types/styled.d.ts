import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        theme: string;
        rgba: (hex: string, alpha: number) => string
        COLORS: {
            primary: '#247B43' | '#143bbe' | string,

            white: '#ffffff' | string,
            black: '#000000' | string,
            error: '#A23030' | string,
            success: '#247B43' | string,

        };
    }
}
