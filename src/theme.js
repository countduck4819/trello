import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";
const theme = extendTheme({
    trello: {
        appBarHeight: "58px",
        boardBarHeight: "60px",
    },
    colorSchemes: {
        // light: {
        //     palette: {
        //         primary: teal,
        //         secondary: deepOrange,
        //     },
        //     // spacing: (factor) => `${0.25 * factor}rem`,
        // },
        // dark: {
        //     palette: {
        //         primary: cyan,
        //         secondary: orange,
        //     },
        //     // spacing: (factor) => `${0.25 * factor}rem`,
        // },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderWidth: "0.5px",
                    "&:hover": {
                        borderWidth: "2px !important",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: "0.875rem",
                }),
                "& fieldset": {
                    borderWidth: "0.5px !important",
                },
                "&:hover fieldset": {
                    borderWidth: "1px !important",
                },
                "&.Mui-focused fieldset": {
                    borderWidth: "1px !important",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        color: theme.palette.primary.main,
                        fontSIze: "0.875rem",
                        ".MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.light,
                        },
                        "&:hover": {
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.primary.main,
                            },
                        },
                    };
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    "*::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "*::-webkit-scrollbar-thumb": {
                        backgroundColor: "#dcdde1",
                        borderRadius: "8px",
                    },
                    "*::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "white",
                    },
                },
            },
        },
    },
});

export default theme;
