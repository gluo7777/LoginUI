import { createMuiTheme, CssBaseline, responsiveFontSizes } from '@material-ui/core';
import { lightBlue, orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import 'typeface-roboto';
import Login from './Login';
import Registration from './Registration';

import { AppContext } from './ContextConfiguration';

let theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: orange
  }
});

theme = responsiveFontSizes(theme, {});

function App() {
  const { defaultApp } = React.useContext(AppContext);
  const [app, setApp] = React.useState({ ...defaultApp });


  const displayPage = () => {
    switch (app.page) {
      case 'login':
        return <Login />;
      case 'registration':
        return <Registration />;
      default:
        return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider value={{ app, setApp }}>
        {displayPage()}
      </AppContext.Provider>
    </ThemeProvider>
  );
}



export default App;
