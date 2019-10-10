import { createMuiTheme, CssBaseline, responsiveFontSizes } from '@material-ui/core';
import { lightBlue, orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import 'typeface-roboto';
import { AppContext } from './ContextConfiguration';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';

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
      case 'home':
        return <Home />;
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
