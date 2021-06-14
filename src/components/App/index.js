import React from 'react';
import ThemeProvider from '@scaleflex/ui/theme';

import AppProvider from '../../context/AppProvider';
import Wrapper from '../Wrapper';

const App = (props) => (
  <React.StrictMode> {/* TODO: Remove StrictMode */}
    <ThemeProvider
      theme={{
        typography: {
          fontFamily: 'Roboto, sans-serif'
        },
      }}
    >
      <AppProvider>
        <Wrapper {...props} />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
)

export default App;
