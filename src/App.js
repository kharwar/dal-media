import { Navbar } from './components';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;