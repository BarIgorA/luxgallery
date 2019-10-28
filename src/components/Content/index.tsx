import React, { FC, lazy, Suspense, memo } from 'react';

// Interfaces
import { IContent, IPhotos } from '../../interfaces';

// Styles
import styles from './styles.module.scss';


const Content: FC<IContent> = ({ photos, component }) => {
  const Component: FC<IPhotos> = lazy<any>(() => import(`../${component}`));
  return (
    <div className={styles.Content}>
      <Suspense fallback="loading...">
        <Component data={photos} />
      </Suspense>
    </div>
  )
}

export default memo(Content);
