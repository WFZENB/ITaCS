import React, {useEffect, useState} from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Navbar from "./components/navbar/Navbar";
import Main from "./pages/main/Main";
import Interact from "./pages/interact/Interact";
import ServerSimulation from "./pages/server-simulation/ServerSimulation";

interface SocketContextI {
  socket?: WebSocket
}

interface VisualizationContextI {
  monitoringFanSpeed: number;
  monitoringDamperOpen: number;
  monitoringTemperature: number;
  monitoringHumidity: number
}

interface SimulationContextI {
  newTemperature: number;
  newHumidity: number;
}

export const SocketContext = React.createContext<SocketContextI>({});
export const VisualizationContext = React.createContext<VisualizationContextI>(
  {
    monitoringFanSpeed: 0,
    monitoringDamperOpen: 0,
    monitoringTemperature: 0,
    monitoringHumidity: 0
  }
)
export const SimulationContext = React.createContext<SimulationContextI>(
  {
    newTemperature: 0,
    newHumidity: 0
  }
)


function App() {

  const [socket, setSocket] = useState<WebSocket>();

  const [newTemperature, setNewTemperature] = useState(18);
  const [newHumidity, setNewHumidity] = useState(40);

  const [monitoringFanSpeed, setMonitoringFanSpeed] = useState(0);
  const [monitoringDamperOpen, setMonitoringDamperOpen] = useState(0);
  const [monitoringTemperature, setMonitoringTemperature] = useState(18);
  const [monitoringHumidity, setMonitoringHumidity] = useState(40);

  useEffect(() => {
    // Создание сокета
    const ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = (messageEvent) => {
      // Извлечение данных
      const message = JSON.parse(messageEvent.data);
      console.log(message);
      if (message?.alias === 'updSettings') {
        setNewTemperature(message?.data.temperature);
        setNewHumidity(message?.data.humidity);
      }
      if (message?.alias === 'serverData') {
        setMonitoringFanSpeed(message?.data.fanSpeed);
        setMonitoringDamperOpen(message?.data.damperOpen);
        setMonitoringTemperature(message?.data.temperature);
        setMonitoringHumidity(message?.data.humidity);
      }
    }

    setSocket(ws);
  }, []);

  return (
    <SocketContext.Provider value={{socket}}>
      <VisualizationContext.Provider value={{
        monitoringFanSpeed,
        monitoringDamperOpen,
        monitoringTemperature,
        monitoringHumidity
      }}>
      <SimulationContext.Provider value={{newTemperature, newHumidity}}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/interact'} element={<Interact />} />
            <Route path={'/simulation'} element={<ServerSimulation />} />
            <Route path={'/*'} element={<Navigate to={'/'} />} />
          </Routes>
        </BrowserRouter>
      </SimulationContext.Provider>
      </VisualizationContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
