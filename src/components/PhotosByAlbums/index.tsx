import React, { FC } from 'react';

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
        albums.map(album => {
          const albumsPhotos = photos.filter(photo => photo.albumId === album.id);
          return albumsPhotos.length ? (
            <div key={album.id} className={styles.albumWrapper}>
              <div key={`album${album.id}`} className={styles.albumTitle}>{album.title}</div>
              <div key={`photosOfAlbum${album.id}`} className={styles.grid}>
                {
                  albumsPhotos
                    .map((photo) => (
                      <Photo key={photo.id} photo={photo} />
                    ))
                }
              </div>
            </div>
          ) : null;
        })
      }
    </div>
  );
}

export default PhotosByAlbums;
