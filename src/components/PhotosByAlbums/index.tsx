import React, { FC, Fragment } from 'react';

// Interfaces
import { TPhoto, TAlbum } from '../../interfaces';

//Custom components
import Photo from '../Photo';

// Styles
import styles from './styles.module.scss';


const PhotosByAlbums: FC<{ albums: TAlbum[], photos: TPhoto[] }> = ({ albums, photos }) => {
  return (
    <div className={styles.PhotosByAlbums}>
      {
        albums.map(album => (
          <Fragment key={album.id}>
            <div key={`album${album.id}`} className={styles.AlbumTitle}>{album.title}</div>
            <div key={`photosOfAlbum${album.id}`} className={styles.grid}>
              {photos
                .filter(photo => photo.albumId === album.id)
                .map((photo) => (
                  <Photo key={photo.id} photo={photo} />
                ))}
            </div>
          </Fragment>
        ))
      }
    </div>
  );
}

export default PhotosByAlbums;
