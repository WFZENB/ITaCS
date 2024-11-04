import React, {FC, useEffect, useRef} from 'react';

import cl from './damper.module.css';

interface PropsI {
  pctOpen: number // 0 - 100
}

const Damper: FC<PropsI> = ({pctOpen}) => {

  const movableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let movable = movableRef.current
    if (movable) {
      movable.style.rotate = (100-pctOpen)/100 * -45 + 'deg';
    }
  }, [pctOpen]);

  return (
    <div className={cl.damper}>
      <div className={cl.damperLeft}></div>
      <div className={cl.damperRight}></div>
      <div className={cl.damperRound}></div>
      <div className={cl.damperMovable} ref={movableRef}></div>
    </div>
  );
};

export default Damper;