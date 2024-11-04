import React, {useEffect} from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Navbar from "./components/navbar/Navbar";
import Main from "./pages/main/Main";
import Interact from "./pages/interact/Interact";

function App() {

  useEffect(() => {
    // Создание сокета
    const socket = new WebSocket('ws://localhost:3000');
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/interact'} element={<Interact />} />
        <Route path={'/*'} element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
