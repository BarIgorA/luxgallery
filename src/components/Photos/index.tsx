import React, { FC, Fragment } from 'react';
import { observer } from 'mobx-react';

// Interfaces
import { IPhotos } from '../../interfaces';

// Custom
import Sentinel from '../Sentinel';
import Photo from '../Photo';

// Styles
import styles from './styles.module.scss';


const Photos: FC<IPhotos> = ({ data }) => {
  if (!data.photos.length || !data.albums.length) return null;

  const photos = data.inStorePhotos;
  const albums = data.inStoreAlbum;

  return (
    <div className={styles.AlbumsWrapper}>
      {
        albums.map(album => (
          <Fragment key={album.id}>
            <div key={`album${album.id}`} className={styles.AlbumTitle}>{album.title}</div>
            <div key={`photosOfAlbum${album.id}`} className={styles.Photos}>
              {photos
                .filter(photo => photo.albumId === album.id)
                .map((photo) => (
                  <Photo key={photo.id} photo={photo} />
              ))}
            </div>
          </Fragment>
        ))
      }
      {!data.isAllLoaded && <Sentinel callback={data.tryLoadNext} />}
    </div>
  )
}

export default observer(Photos);
