/**
 * Header module
 */
import React, { FC, memo } from 'react';

// Styles
import styles from './styles.module.scss';


const Header: FC = () => (
  <header className={styles.Header} >
    <h1>Luxoft Gallery</h1>
    <span className={styles.search}>
      <svg width="24px" height="24px" className={styles['lens-icon']} viewBox="0 0 24 24">
        <path d="M20.49 19l-5.73-5.73C15.53 12.2 16 10.91 16 9.5A6.5 6.5 0 1 0 9.5 16c1.41 0 2.7-.47 3.77-1.24L19 20.49 20.49 19zM5 9.5C5 7.01 7.01 5 9.5 5S14 7.01 14 9.5 11.99 14 9.5 14 5 11.99 5 9.5z"></path>
      </svg>
      <input type="text"/>
    </span>
  </header>
);


export default memo(Header);
