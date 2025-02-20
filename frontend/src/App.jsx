import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Bookings from './pages/bookings/Bookings';
import Home from './pages/home/home';

function App() {

  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/bookings" element={<Bookings/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
