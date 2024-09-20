import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Game from './components/Game';
import MainPage from './components/MainPage';
import SignUp from './components/SignUp';
import Dictionary from './components/Dictionary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/game' element={<Game />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/dictionary' element={<Dictionary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
