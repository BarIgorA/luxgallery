import React, { FC, lazy, Suspense, memo } from 'react';

// Interfaces
import { IContent, IPhotos } from '../../interfaces';

// Context
import PhotoInViewPortProvider from '../../contextProviders/PhotoInViewPortProvider';


// Styles
import styles from './styles.module.scss';


const Content: FC<IContent> = ({ photos, component }) => {
  const Component: FC<IPhotos> = lazy<any>(() => import(`../${component}`));
  const Provider = PhotoInViewPortProvider.provider;
  const value = PhotoInViewPortProvider.value;

  return (
    <div className={styles.Content}>
      <Provider value={value} >
        <Suspense fallback="loading...">
          <Component data={photos} />
        </Suspense>
      </Provider>
    </div>
  )
}

export default memo(Content);
