import './App.css';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { muiTheme } from './util/MuiTheme';
import HomePage from './page/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import { GlobalContextProvider } from './contexts/GlobalContext';
import Loader from './components/Loader';
import RegisterModal from './components/RegisterModal';
import ClientCallFailedModal from './components/ClientCallFailedModal';
import PlayerPage from './page/PlayerPage';
import { PLAYER_PAGE_CREATE_MODE, PLAYER_PAGE_VIEW_MODE } from './util/Constants';
import ConsultPlayerPage from './page/ConsultPlayerPage';
import AdminPage from './page/AdminPage';
import IscrittorePage from './page/IscrittorePage';
import TeamPage from './page/TeamPage';
import DayPage from './page/DayPage';
import ScorePage from './page/ScorePage';

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
                  <Route path="/iscrittore" element={<IscrittorePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/players" element={<ConsultPlayerPage />} />
                  <Route path="/players/create" element={<PlayerPage mode={PLAYER_PAGE_CREATE_MODE} />} />
                  <Route path="/players/view/:_id" element={<PlayerPage mode={PLAYER_PAGE_VIEW_MODE} />} />
                  <Route path="/teams" element={<TeamPage />} />
                  <Route path="/day" element={<DayPage/>} />
                  <Route path="/score" element={<ScorePage/>} />
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
