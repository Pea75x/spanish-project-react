import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Game from './components/Game';
import Homepage from './components/Homepage';
import SignUp from './components/SignUp';
import SearchList from './components/SearchList';
import Word from './components/Word';
import Create from './components/Create';
import Navbar from './components/Navbar';
import Sentence from './components/Sentence';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/games' element={<Game />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/search' element={<SearchList />} />
        <Route path='/word-show' element={<Word />} />
        <Route path='/sentence-show' element={<Sentence />} />
        <Route path='/create' element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
