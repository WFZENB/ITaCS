import React, {useContext, useEffect, useState} from 'react';
import cl from "./simulation.module.css";
import Damper from "../../components/damper/Damper";
import Fan from "../../components/fan/Fan";
import {SimulationContext, SocketContext} from "../../App";

const Simulation = () => {

  const {socket} = useContext(SocketContext);

  const {newTemperature, newHumidity} = useContext(SimulationContext);

  const [pctOpen, setPctOpen] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);

  const [actualTemperature, setActualTemperature] = useState(18);
  const [actualHumidity, setActualHumidity] = useState(40);




  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()

  const loop = () => {
    //
    clearInterval(intervalId)
  }

  useEffect(() => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(setInterval(loop, 10));
  }, [newTemperature, newHumidity]);



  useEffect(() => {
    // Логика стабилизации системы
    setPctOpen(Math.floor((newTemperature - 18) * 16.66))
    setSpeed(Math.floor((newHumidity - 40) * 5))
  }, [newTemperature, newHumidity]);

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
    </div>

  );
};

export default Simulation;