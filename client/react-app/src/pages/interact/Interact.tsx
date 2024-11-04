import React from 'react';

import Visualization from "./components/visualization/Visualization";
import Settings from "./components/settings/Settings";
import Monitoring from "./components/monitoring/Monitoring";

import cl from './interact.module.css'

const Interact = () => {
  return (
    <div className={cl.interactPage}>
      <div className={cl.topFrame}>
        <Visualization />
      </div>
      <div className={cl.bottomFrame}>
        <Settings/>
        <Monitoring/>
      </div>
    </div>
  );
};

export default Interact;