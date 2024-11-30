import React, {useContext, useState} from 'react';

import cl from './settings.module.css';
import cn from 'classnames';
import {SocketContext} from "../../../../App";

const Settings = () => {

  const {socket} = useContext(SocketContext);

  const [temperature, setTemperature] = useState<number>(18);
  const [humidity, setHumidity] = useState<number>(40);

  const setTemperatureHandler = (val: number) => {
    setTemperature(Math.min(Math.max(val, 18), 24));
  }

  const setHumidityHandler = (val: number) => {
    setHumidity(Math.min(Math.max(val, 40), 60));
  }
  
  return (
    <div className={cn('card', cl.settingsFrame)}>
      <div className={'title'}>Настройки</div>
      <div className={cl.param}>
        <label>Температура внутри помещения</label>
        <input
          type="number" min="18" max="24"
          value={temperature}
          onChange={(e) => {
            setTemperatureHandler(Number(e.target.value))
          }}/>
      </div>
      <div className={cl.param}>
        <label>Влажность внутри помещения</label>
        <input
          type="number" min="40" max="60"
          value={humidity}
          onChange={(e) => {
            setHumidityHandler(Number(e.target.value))
          }}
        />
      </div>
      <button
        onClick={() => {
          socket?.send(JSON.stringify({
            alias: 'updSettings',
            data: {
              temperature: temperature,
              humidity: humidity
            }
          }));
        }}
      >
        Задать параметры
      </button>
    </div>
  );
};

export default Settings;