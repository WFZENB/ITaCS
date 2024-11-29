import React, {useEffect, useState} from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Navbar from "./components/navbar/Navbar";
import Main from "./pages/main/Main";
import Interact from "./pages/interact/Interact";
import Simulation from "./pages/simulation/Simulation";

interface SocketContextI {
  socket?: WebSocket
}

interface VisualizationContextI {
  fan: number;
  damper: number;
}

interface SimulationContextI {
  newTemperature: number;
  newHumidity: number;
}

export const SocketContext = React.createContext<SocketContextI>({});
export const VisualizationContext = React.createContext<VisualizationContextI>({fan: 0, damper: 0})
export const SimulationContext = React.createContext<SimulationContextI>({newTemperature: 0, newHumidity: 0})


function App() {

  const [socket, setSocket] = useState<WebSocket>();

  const [newTemperature, setNewTemperature] = useState(18);
  const [newHumidity, setNewHumidity] = useState(40);

  useEffect(() => {
    // Создание сокета
    const ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = (messageEvent) => {
      // Извлечение данных
      const message = JSON.parse(messageEvent.data);
      console.log(message);
      setNewTemperature(message?.newTemperature);
      setNewHumidity(message?.newHumidity);
    }

    setSocket(ws);
  }, []);

  return (
    <SocketContext.Provider value={{socket}}>
      <VisualizationContext.Provider value={{fan: newTemperature, damper: newHumidity}}>
      <SimulationContext.Provider value={{newTemperature, newHumidity}}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/interact'} element={<Interact />} />
            <Route path={'/simulation'} element={<Simulation />} />
            <Route path={'/*'} element={<Navigate to={'/'} />} />
          </Routes>
        </BrowserRouter>
      </SimulationContext.Provider>
      </VisualizationContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
