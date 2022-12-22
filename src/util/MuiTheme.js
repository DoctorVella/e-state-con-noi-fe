import { createTheme } from "@mui/material";

const orange = '#F7931E';
const darkOrange = '#F05A28';
const lightOrange = '#FFF0BC';
const lightYellow = '#FEFCDB';

const redTeam = '#FC666B';
const yellowTeam = '#F7E969';
const greenTeam = '#A2DE5E';
const blueTeam = '#346CDB';

export const muiTheme = createTheme({
    typography: {
        fontFamily: [
            'Raleway',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(',')
    },
    palette:{
        primary: {
            main: orange
        },
        error: {
            main: darkOrange
        },
        info: {
            main: lightOrange
        },
        secondary: {
            main: lightYellow
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                size: 'medium',
                variant: 'contained',
            },
            variants: [
                {
                    props: {variant: 'contained'},
                    style: {
                        color: 'white'
                    }
                }
            ]
        },
        MuiCardActions: {
            defaultProps: {
                style: {
                    justifyContent: 'center'
                }
            }
        },
        MuiTypography: {
            defaultProps: {
                fontWeight: '700',
                color: orange
            },
            variants: [
                {
                    props: {variant: 'title'},
                    style: {
                        background: "-webkit-linear-gradient(left, " + redTeam + " 15%, " + yellowTeam + " 40%, " + greenTeam + ", " + blueTeam + " 85%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }
                },
                {
                    props: {variant: 'h1'}
                },
                {
                    props: {variant: 'h2'}
                },
                {
                    props: {variant: 'h3'}
                },
                {
                    props: {variant: 'paragraph'},
                    style: {
                        textAlign: 'left'
                    }
                }
            ]
        }
    }
});

muiTheme.typography.title = {
    fontSize: '32px',
    [muiTheme.breakpoints.up('md')]: {
      fontSize: '48px',
    },
};

muiTheme.typography.h1 = {
    fontSize: '32px',
    [muiTheme.breakpoints.up('md')]: {
      fontSize: '48px',
    },
};

muiTheme.typography.h2 = {
    fontSize: '24px',
    [muiTheme.breakpoints.up('md')]: {
      fontSize: '32px',
    },
};

muiTheme.typography.h3 = {
    fontSize: '24px',
    [muiTheme.breakpoints.up('md')]: {
      fontSize: '24px',
    },
};

muiTheme.typography.paragraph = {
    fontSize: '20px',
    [muiTheme.breakpoints.up('md')]: {
      fontSize: '24px',
    },
}