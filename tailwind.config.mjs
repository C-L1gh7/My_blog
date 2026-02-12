/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                background: "#f0f0ed",
                foreground: "#1a1a1a",
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: '#1a1a1a',
                        h1: {
                            color: '#000000',
                            fontWeight: '900',
                            textTransform: 'uppercase',
                        },
                        h2: {
                            color: '#000000',
                            fontWeight: '800',
                            marginTop: '2em',
                        },
                        h3: {
                            color: '#000000',
                            fontWeight: '700',
                        },
                        strong: {
                            color: '#000000',
                            fontWeight: '800',
                        },
                        a: {
                            color: '#000000',
                            textDecoration: 'underline',
                            fontWeight: '600',
                            transition: 'color 0.2s',
                            '&:hover': {
                                color: '#dc2626',
                            },
                        },
                        code: {
                            color: '#dc2626',
                            fontWeight: '600',
                            backgroundColor: '#f3f4f6',
                            padding: '0.2em 0.4em',
                            borderRadius: '0.25rem',
                        },
                        'code::before': { content: '""' },
                        'code::after': { content: '""' },
                        blockquote: {
                            borderLeftColor: '#000000',
                            borderLeftWidth: '4px',
                            color: '#52525b',
                            fontStyle: 'italic',
                            backgroundColor: '#f4f4f5',
                            padding: '1em',
                        },
                        'ul > li::marker': {
                            color: '#000000',
                        },
                        img: {
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'block',
                            borderRadius: '0.125rem',
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
