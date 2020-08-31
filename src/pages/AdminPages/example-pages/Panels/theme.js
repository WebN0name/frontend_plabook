import { createMuiTheme, colors } from '@material-ui/core';

const theme = createMuiTheme({
  margin: {
    main:24
  },
  palette: {    
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: "#afbdc4",
      dark: "#808d94",
      light: "#e1eff7"
    },
    secondary: {
        main: "#3f51b5",
        dark: "#81b9bf",
        light:"#e5ffff"
    },
    text: {
      primary: "#363d4c",
      secondary: "#323335"
    },    
    color:
    {
      primary:"#546e7a",
      selected: "#3f51b5",
      notClickable:"#afb0b1"
    }
  },
});

export default theme;
