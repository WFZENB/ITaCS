import React, {useContext, useEffect, useState} from 'react';
import cl from "./simulation.module.css";
import Damper from "../../components/damper/Damper";
import Fan from "../../components/fan/Fan";
import {SimulationContext, SocketContext} from "../../App";


const STD_T = 21;
const STD_H = 50;


const ServerSimulation = () => {

  const {socket} = useContext(SocketContext);

  const {newTemperature, newHumidity} = useContext(SimulationContext);

  const [pctOpen, setPctOpen] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);

  const [actualT, setActualT] = useState(18);
  const [actualH, setActualH] = useState(40);

  const deviceLoop = () => {
    // Логика управления устройствами
    if (actualT > STD_T || actualH > STD_H) {
      setSpeed(100);
      setPctOpen(100);
    }
    if (actualT <= STD_T && actualH <= STD_H) {
      setSpeed(5);
      setPctOpen(50);
    }
    if (actualT <= STD_T && actualH > STD_H) {
      setSpeed(50);
      setPctOpen(75);
    }
    if (actualT <= STD_T && actualH < STD_H) {
      setSpeed(0);
      setPctOpen(0);
    }
  }

  const paramLoop = () => {
    // Логика воздействия устройств на параметры
    if (pctOpen === 0) {
      // Заслонка закрыта
      if (actualH < 60-1) setActualH(prevState => prevState + 1)
    } else {
      let step = pctOpen/100
      if (actualH > 40+step) setActualH(prevState => prevState - step)
      else setActualH(40)
    }
    if (speed === 0) {
      // Заслонка закрыта
      if (actualT < 24-1) setActualT(prevState => prevState + 1)
    } else {
      let step = pctOpen/100
      if (actualT > 18+step) setActualT(prevState => prevState - step)
      else setActualT(18)
    }
  }

  useEffect(() => {
    setActualT(newTemperature);
    setActualH(newHumidity);
  }, [newTemperature, newHumidity]);

  const [loop, setLoop] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoop(loop + 1)
      deviceLoop()
      paramLoop()
    }, 500)
  }, [loop]);

  useEffect(() => {
    socket?.send(JSON.stringify({
      alias: 'serverData',
      data: {
        fanSpeed: speed,
        damperOpen: pctOpen,
        temperature: actualT,
        humidity: actualH
      }
    }));
  }, [pctOpen, speed, actualT, actualH]);

  return (

    <div className={cl.simulationPage}>
      <div className={'card'}>
        <div className={'title'}>Визуализация</div>
        <div className={cl.container}>
          <div className={cl.item}>
            <div>Заслонка</div>
            <Damper pctOpen={pctOpen}/>
            <div>Открыта на {pctOpen}%</div>
          </div>
          <div className={cl.item}>
            <div>Вентилятор</div>
            <Fan speed={speed}/>
            <div>Скорость вращения {speed} об/мин</div>
          </div>
        </div>
      </div>
      <div className={'card'}>
        <div className={'title'}>Текущие значения параметров</div>
        <div className={cl.container}>
          <div className={cl.item}>
            <div>Влажность</div>
            <div>{actualH}</div>
          </div>
          <div className={cl.item}>
            <div>Температура</div>
            <div>{actualT}</div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ServerSimulation;