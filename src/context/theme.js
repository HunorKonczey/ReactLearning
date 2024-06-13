import { createTheme } from '@material-ui/core/styles';
import { indigo, red, teal } from "@mui/material/colors";

export default createTheme({
  palette: {
    primary: {
      main: teal[600],
      light: teal[100],
      dark: teal[800],
      contrastText: "#fff"
    },
    secondary: {
      main: indigo[600],
      light: indigo[100],
      dark: indigo[800],
      contrastText: "#000"
    },
    error: {
      main: red[600],
    }
  },
});