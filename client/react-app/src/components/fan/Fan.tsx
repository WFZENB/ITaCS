import React, {FC, useEffect, useRef, useState} from 'react';

import cl from './fan.module.css';

import fanIcon from '../../data/icons/fan.png';

interface PropsI {
  speed: number
}

const Fan: FC<PropsI> = ({speed}) => {

  const imgRef = useRef<HTMLImageElement>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()

  const loop = () => {
    let img = imgRef.current
    if (img) {
      let rotate = Number(img.style.rotate.slice(0, -3))
      img.style.rotate = (rotate + speed/60*3.8)%360 + 'deg';
    }
  }


  useEffect(() => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(setInterval(loop, 10));
  }, [speed]);

  return (
    <div className={cl.fan}>
      <img src={fanIcon} alt={''} ref={imgRef}/>
    </div>
  );
};

export default Fan;