import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Game from './components/Game';
import Homepage from './components/Homepage';
import SignUp from './components/SignUp';
import SearchList from './components/SearchList';
import Word from './components/Word';
import Create from './components/Create';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/games' element={<Game />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/search' element={<SearchList />} />
        <Route path='/word-show' element={<Word />} />
        <Route path='/create' element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
