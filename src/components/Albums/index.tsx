import React, { FC, Fragment } from 'react'
import { observer } from 'mobx-react';

// Interfaces
import { IPhotos } from '../../interfaces';

// Custom
import Album from './Album';
import CloseButton from './CloseButton';
import PhotosByAlbums from '../PhotosByAlbums';

// Styles
import styles from './styles.module.scss';


const Albums: FC<IPhotos> = ({ data }) => {
  if (!data.albums.length) return null;

  const albums = data.AllAlbums;
  const expandedAlbum = albums.filter(album => album.expanded);

  return (
    <div className={styles.Albums}>
      {
        expandedAlbum.length
        ? (
            <Fragment>
              <CloseButton callback={expandedAlbum[0].closeMe}/>
              <PhotosByAlbums photos={expandedAlbum[0].albumsPhotos} albums={expandedAlbum} />
            </Fragment>
          )
        : (
            <div className={styles.grid}>
              {albums.map(album => <Album key={album.id} album={album} />)}
            </div>
          )
      }
    </div>
  )
}

export default observer(Albums);
