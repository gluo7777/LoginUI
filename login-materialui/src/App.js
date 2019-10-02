import { createMuiTheme, CssBaseline, responsiveFontSizes } from '@material-ui/core';
import { lightBlue, orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import 'typeface-roboto';
import Login from './Login';
import Registration from './Registration';

let theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: orange
  }
});

theme = responsiveFontSizes(theme, {});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Login /> */}
      <Registration />
    </ThemeProvider>
  );
}



export default App;
