import React, { FC } from 'react';

// Interfaces
import { IAlbum } from '../../../interfaces';

// Styles
import styles from './styles.module.scss';


const Album: FC<IAlbum> = ({ album }) => {
  return (
    <div className={styles.Album} >
      <button
        type='button'
        className={styles.title}
        onClick={album.expandMe}
      >
        {album.title}
      </button>
    </div>
  )
}

export default Album;
