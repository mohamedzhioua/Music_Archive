import { filledInputClasses } from "@mui/material/FilledInput";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { common } from "@mui/material/colors";
import { alpha, createTheme } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material";

type Mode = "light" | "dark";
const muiTheme = createTheme();

export const neutral = {
  50: "#F8F9FA",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D2D6DB",
  400: "#9DA4AE",
  500: "#6C737F",
  600: "#4D5761",
  700: "#2F3746",
  800: "#1C2536",
  900: "#111927",
} as const;
export const getDesignTokens = (mode: Mode) => {
  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    shape: {
      borderRadius: 8,
    },

    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            action: {
              active: neutral[500],
              disabled: alpha(neutral[100], 0.38),
              disabledBackground: alpha(neutral[100], 0.12),
              focus: alpha(neutral[100], 0.16),
              hover: alpha(neutral[100], 0.04),
              selected: alpha(neutral[100], 0.12),
            },
            background: {
              default: "#0E1320",
              paper: neutral[900],
            },
            divider: "#F2F4F7",
            neutral,
            primary: {
              main: "#FFFFFF",
            },
            text: {
              primary: "#EDF2F7",
              secondary: "#A0AEC0",
              disabled: "rgba(255, 255, 255, 0.48)",
            },
          }
        : {
            // palette values for light mode
            action: {
              active: neutral[500],
              disabled: alpha(neutral[900], 0.38),
              disabledBackground: alpha(neutral[900], 0.12),
              focus: alpha(neutral[900], 0.16),
              hover: alpha(neutral[900], 0.04),
              selected: alpha(neutral[900], 0.12),
            },
            background: {
              default: neutral[50],
              paper: common.white,
            },
            divider: "#2D3748",
            neutral,
            primary: {
              main: "#000000",
            },
            text: {
              primary: neutral[900],
              secondary: neutral[500],
              disabled: alpha(neutral[900], 0.38),
            },
          }),
    },

    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: "14px",
            fontWeight: 500,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: "24px",
          },
          root: {
            "&:hover": {
              backgroundColor:
                mode === "dark"
                  ? alpha(neutral[100], 0.04)
                  : alpha(neutral[900], 0.04),
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: mode === "dark" ? "#2D3748" : neutral[200],
              },
            },
            [`&.${outlinedInputClasses.focused}`]: {
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "#fff7ed",
                boxShadow: `#fff7ed 0 0 0 2px`,
              },
            },
            [`&.${filledInputClasses.error}`]: {
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "#F04438",
                boxShadow: `#F04438 0 0 0 2px`,
              },
            },
          },
          notchedOutline: {
            transition: muiTheme.transitions.create([
              "border-color",
              "box-shadow",
            ]),
            borderColor: mode === "dark" ? "#2D3748" : neutral[200],
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "32px 24px",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "25px 30px",
            borderBottomColor: mode === "dark" ? "#2D3748" : "#F2F4F7",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              backgroundColor: mode === "dark" ? neutral[800] : neutral[50],
              color: mode === "dark" ? neutral[400] : neutral[700],
            },
          },
        },
      },
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
