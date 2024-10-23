import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Game from './components/Game';
import Homepage from './components/Homepage';
import SignUp from './components/SignUp';
import Words from './components/Words';
import Sentences from './components/Sentences';
import Games from './components/Games';
import Word from './components/Word';
import Create from './components/Create';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/game' element={<Game />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/words' element={<Words />} />
        <Route path='/words-show' element={<Word />} />
        <Route path='/sentences' element={<Sentences />} />
        <Route path='/games' element={<Games />} />
        <Route path='/create' element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
