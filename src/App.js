import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FormComponent from './components/FormComponent';
import Divider from '@mui/material/Divider';
import OutputDataComponent from './components/OutputDataComponent';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <FormComponent/>
        <Divider />
        <OutputDataComponent/>
    </ThemeProvider>
  );
}

export default App;