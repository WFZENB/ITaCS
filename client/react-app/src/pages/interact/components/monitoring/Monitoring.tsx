import React, {useContext} from 'react';
import {SocketContext} from "../../../../App";

const Monitoring = () => {

  const {socket} = useContext(SocketContext);

  return (
    <div className={'card'}>
      <div className={'title'}>Мониторинг</div>
      <button onClick={() => {

      }}>
        Test WS
      </button>
    </div>
  );
};

export default Monitoring;