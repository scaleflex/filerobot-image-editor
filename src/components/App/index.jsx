/** External Dependencies */
import React from 'react';
import ThemeProvider from '@scaleflex/ui/theme';

/** Internal Dependencies */
import Wrapper from 'components/Wrapper';
import { AppProvider } from 'context';
import { FontsFaces, IconsColor } from './globalStyles';

const demoProps = {
  // string or image html element
  image:
    'https://images.unsplash.com/photo-1553451166-232112bda6f6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920',
};

const App = () => (
  <>
    <React.StrictMode>
      <ThemeProvider>
        <FontsFaces />
        <IconsColor />
        <AppProvider>
          <Wrapper {...demoProps} />
        </AppProvider>
      </ThemeProvider>
    </React.StrictMode>
  </>
);

export default App;
