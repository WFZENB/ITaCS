import React from 'react';
import {NavLink, useLocation} from "react-router-dom";

import cl from './navbar.module.css';

import homeIcon from '../../data/icons/home.svg';

const Navbar = () => {

  const location = useLocation();

  return (
    <div className={cl.navbar}>
      <div className={cl.left}>
        {location.pathname !== '/' &&
          <NavLink to={'/'} className={cl.homeIcon}>
              <img src={homeIcon} alt={''}/>
          </NavLink>
        }
      </div>
      <div className={cl.title}>
        {location.pathname === '/'
          ? 'Система управления вентиляцией складского помещения'
          : 'Мониторинг-управление'
        }
      </div>
      <div className={cl.right}/>
    </div>
  );
};

export default Navbar;