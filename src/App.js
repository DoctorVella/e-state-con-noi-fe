import './App.css';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { muiTheme } from './util/MuiTheme';
import HomePage from './page/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IscrittorePage from './page/IscrittorePage';

function App() {

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="App">
        <Box sx={{ p: 3 }}>
          <Box sx={{ pb: 3 }}>
            <Typography variant='title'>E...STATE CON NOI</Typography>
            <Typography variant='h2'>parrocchia Santa Fara</Typography>
          </Box>
          <BrowserRouter>
            <Routes>
              <Route path="/iscrittore" element={<IscrittorePage/>} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
