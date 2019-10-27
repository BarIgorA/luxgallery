/**
 * Header module
 */
import React, { FC } from 'react';

// Interfaces
import { ITabs } from './interfaces';

// Custom
import Icon from '../Icon';

// Styles
import styles from './styles.module.scss';


const Tabs: FC<ITabs> = ({ tabs }) => {

    return (
    <nav>
      <ul className={styles.Tabs} >
        {
          !!tabs.length &&
          tabs.map(({id, title, icon, setActive, amIActive}, key) => (
            <li key={id}>
              <button
                className={`${amIActive() ? styles.active : ''}`}
                onClick={setActive}
              >
                <Icon svg={icon} />
                {title}
            </button>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};


export default Tabs;
