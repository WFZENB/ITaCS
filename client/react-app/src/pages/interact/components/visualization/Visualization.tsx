import React, {useContext, useEffect, useState} from 'react';

import cl from './visualization.module.css';
import cn from "classnames";
import Damper from "../../../../components/damper/Damper";
import Fan from "../../../../components/fan/Fan";
import {VisualizationContext} from "../../../../App";

const Visualization = () => {

  const {
    monitoringFanSpeed,
    monitoringDamperOpen,
  } = useContext(VisualizationContext);

  const [pctOpen, setPctOpen] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);

  useEffect(() => {
    setSpeed(monitoringFanSpeed);
    setPctOpen(monitoringDamperOpen);
  }, [monitoringFanSpeed, monitoringDamperOpen]);

  return (
    <div className={cn('card', cl.visualizationFrame)}>
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
  );
};

export default Visualization;