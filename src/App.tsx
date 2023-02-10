import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login.page';


function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<LoginPage />} />
       
      </Routes>
    </>
  );
}

export default App;
