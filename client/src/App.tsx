import './styles/main.scss';
import '@fontsource/inter';
import { AppRoutes } from './routes';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { appTheme } from './config/theme';
import { Provider } from 'react-redux';
import { store } from './stores/reduxStore';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
      <CssVarsProvider theme={appTheme}>
        <CssBaseline />
        <Toaster position='top-right' />
        <AppRoutes />
      </CssVarsProvider>
    </Provider>
  );
}

export default App;
