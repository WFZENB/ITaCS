import React, {useState} from 'react';

import cl from './visualization.module.css';
import cn from "classnames";
import Damper from "../../../../components/damper/Damper";
import Fan from "../../../../components/fan/Fan";

const Visualization = () => {

  const [pctOpen, setPctOpen] = useState<number>(100);
  const [speed, setSpeed] = useState<number>(30)

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