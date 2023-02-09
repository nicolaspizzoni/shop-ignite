import { globalCss } from ".";

export const globalStyle = globalCss({
    '*': {
        margin: 0,
        padding: 0,
    },

    body: {
        background: '$gray900',
        color: '$gray-100',
        '-webkit-font-smoothing': 'antialiased',
    },

    'body, textarea, button, input': {
        fontFamily: 'Roboto',
        fontWeight: 400,
    }
})