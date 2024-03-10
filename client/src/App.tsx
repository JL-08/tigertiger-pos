import './styles/main.scss';
import '@fontsource/inter';
import { AppRoutes } from './routes';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { appTheme } from './config/theme';

function App() {
  return (
    <CssVarsProvider theme={appTheme}>
      <CssBaseline />
      <AppRoutes />
    </CssVarsProvider>
  );
}

export default App;
