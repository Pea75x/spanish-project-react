import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Game from './components/Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
