/**
 * Main module
 */
import React, { FC } from 'react';

// Interfaces
import { IChildren } from '../../interfaces';

// Styles
import styles from './styles.module.scss';


const Main: FC<IChildren> = ({ children }) => (
  <main className={styles.Main} >
    {children}
  </main>
);


export default Main;
