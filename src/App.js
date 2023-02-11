import './App.css';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { muiTheme } from './util/MuiTheme';
import HomePage from './page/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import UserPage from './page/UserPage';
import { GlobalContextProvider } from './contexts/GlobalContext';
import Loader from './components/Loader';
import RegisterModal from './components/RegisterModal';
import ClientCallFailedModal from './components/ClientCallFailedModal';
import PlayerPage from './page/PlayerPage';
import { PLAYER_PAGE_CREATE_MODE, PLAYER_PAGE_VIEW_MODE } from './util/Constants';

function App() {

  return (
    <GlobalContextProvider>
        <ThemeProvider theme={muiTheme}>
          <div className="App">
            <Box sx={{ p: 3 }}>
              <Box sx={{ pb: 3 }}>
                <Typography variant='title'>E...STATE CON NOI</Typography>
                <Typography variant='h2'>parrocchia Santa Fara</Typography>
              </Box>
              <BrowserRouter>
                <Routes>
                  <Route path="/user" element={<UserPage />} />
                  <Route path="/create" element={<PlayerPage mode={PLAYER_PAGE_CREATE_MODE} />} />
                  <Route path="/view/:_id" element={<PlayerPage mode={PLAYER_PAGE_VIEW_MODE} />} />
                  <Route path="/" element={<HomePage />} />
                </Routes>
                <LoginModal />
                <RegisterModal />
                <ClientCallFailedModal />
              </BrowserRouter>
            </Box>
            <Loader/>
          </div>
        </ThemeProvider>
    </GlobalContextProvider>
  );
}

export default App;
