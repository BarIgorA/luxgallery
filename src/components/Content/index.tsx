import React, { FC, lazy, Suspense } from 'react';
import { observer } from 'mobx-react';

// Models
import AlbumModel from '../../models/AlbumModel';
import PhotoModel from '../../models/PhotoModel';
import { PhotosModel } from '../../models/PhotosModel';

// Styles
import styles from './styles.module.scss';


const Content: FC<{photos: typeof PhotosModel.Type, component: string}> = ({ photos, component }) => {
  const Component: FC<{data: typeof PhotoModel.Type[] | typeof AlbumModel.Type}> = lazy<any>(() => import(`../${component}`));
  return (
    <div className={styles.Content}>
      <Suspense fallback="loading...">
        <Component data={photos.inStorePhotos} />
      </Suspense>
    </div>
  )
}

export default observer(Content);
