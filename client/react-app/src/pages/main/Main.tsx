import React from 'react';

import cl from './main.module.css';
import cn from 'classnames';
import {NavLink} from "react-router-dom";

const Main = () => {
  return (
    <div className={cl.mainPage}>
      <div className={cl.cards}>
        <div className={cn('card', cl.topBlock)}>
          <div className={'title'}>Описание</div>
          <div>
            Вентиляция складского помещения необходима для поддержания оптимальных условий хранения товаров,
            предотвращения накопления влаги и обеспечения комфортного микроклимата.
          </div>
          <div className={cl.params}>
            <div className={cl.param}>Температура:</div>
            <ul>
              <li>Для большинства товаров оптимальный диапазон температуры составляет от 18°C до 24°C;</li>
              <li>Для специфических товаров могут потребоваться более строгие условия, такие как температура от 15°C
                до 20°C.
              </li>
            </ul>

            <div className={cl.param}>Влажность:</div>
            <ul>
              <li>Оптимальный уровень относительной влажности для хранения большинства товаров находится в пределах
                40%–60%;
              </li>
              <li>
                Высокая влажность (выше 60%) может привести к плесени, гниению и другим проблемам.
                Низкая влажность (ниже 40%) может вызвать высыхание и повреждение некоторых материалов.
              </li>
            </ul>
          </div>
        </div>
        <div className={cl.bottomBlock}>
          <div className={cn('card', cl.team)}>
            <div className={'title'}>Бригада</div>
            <ol>
              <li>Айзенберг Семен Александрович</li>
              <li>Омельченко Артем Андреевич</li>
              <li>Зарипов Азат Радикович</li>
              <li>Хикматиллаев Дильшод</li>
            </ol>
          </div>
          <div className={cn('card', cl.link)}>
            <div className={'title'}>Ссылка на систему</div>
            <NavLink to={'/interact'}>
              Мониторинг-управление
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;