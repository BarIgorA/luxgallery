import React, { FC, lazy, Suspense } from 'react';
import { observer } from 'mobx-react';

// Interfaces
import { IModalPhoto } from '../../interfaces';

// Styles
import styles from './styles.module.scss';


const ModalPhoto:FC<IModalPhoto> = ({ photo }) => {
  if (!photo || !photo.isPhotoExpanded) return null;

  const Portal = lazy(() => import('./Portal'));

  return (
    <Suspense fallback='loading...'>
      <Portal>
        <img
          className={styles.ResizableImage}
          src={photo.url}
          alt={photo.title}
          onClick={photo.hideMe}
        />
        <div className={styles.title}>{photo.title}</div>
      </Portal>
    </Suspense>
  )
}

export default observer(ModalPhoto);
