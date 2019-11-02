/**
 * Layout module
 * Just styling
 */
import React, { FC } from 'react';

// Interfaces
import { IChildren } from '../../interfaces';

// Styles
import styles from './styles.module.scss';



const Layout: FC<IChildren> = ({ children }) => (
  <div className={styles.Layout} >{children}</div>
);


export default Layout;
