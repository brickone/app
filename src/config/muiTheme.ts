import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

const muiTheme: ThemeOptions = {
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "transparent",
        color: "#232D41"
      }
    },
    MuiCardActions: {
      root: {
        justifyContent: "flex-end"
      }
    },
    MuiCardHeader: {
      action: {
        alignSelf: "auto",
        marginBottom: -6,
        marginRight: 0,
        marginTop: -6
      }
    },
    MuiDrawer: {
      paper: {
        background: "#fff",
        color: "#232D41",
        width: 240
      },
      root: {
        width: 240
      }
    },
    MuiListSubheader: {
      root: {
        fontWeight: 700
      }
    }
  },
  palette: {
    primary: {
      contrastText: "#fff",
      main: "#FF4641"
    },
    secondary: {
      contrastText: "#fff",
      main: "#232D41"
    }
  }
};

export default muiTheme;