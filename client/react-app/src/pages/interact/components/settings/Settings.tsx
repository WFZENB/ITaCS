import React, {useState} from 'react';

import cl from './settings.module.css';
import cn from 'classnames';

const Settings = () => {

  const [temperature, setTemperature] = useState<number>(18);
  const [humidity, setHumidity] = useState<number>(40)
  
  return (
    <div className={cn('card', cl.settingsFrame)}>
      <div className={'title'}>Настройки</div>
      <div className={cl.param}>
        <label>Температура внутри помещения</label>
        <input
          type="number" min="18" max="24"
          value={temperature}
          onChange={(e) => {
            setTemperature(Math.min(Math.max(Number(e.target.value), 18), 24))
          }}/>
      </div>
      <div className={cl.param}>
        <label>Влажность внутри помещения</label>
        <input
          type="number" min="40" max="60"
          value={humidity}
          onChange={(e) => {
            setHumidity(Math.min(Math.max(Number(e.target.value), 40), 60))
          }}
        />
      </div>
    </div>
  );
};

export default Settings;