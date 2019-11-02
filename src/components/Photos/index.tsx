import React, { FC, lazy, Suspense } from 'react';
import { observer } from 'mobx-react';

// Interfaces
import { IPhotos } from '../../interfaces';

// Custom
import Sentinel from './Sentinel';
import PhotosByAlbums from '../PhotosByAlbums';

// Styles
import styles from './styles.module.scss';


const Photos: FC<IPhotos> = ({ data }) => {
  if (!data.photos.length || !data.albums.length) return null;

  const photos = data.inStorePhotos;
  const albums = data.inStoreAlbums;

  const SearchResults = lazy(() => import('./SearchResults'));

  return (
    <div className={styles.Photos}>
      {
        data.searchTerm
          ? (
              <Suspense fallback="loading...">
                <SearchResults photos={photos} searchTerm={data.searchTerm} isAllLoaded={data.isAllLoaded} />
              </Suspense>
            )
          : <PhotosByAlbums photos={photos} albums={albums} />
      }
      {
        !data.isAllLoaded && (
          <Sentinel callback={data.tryLoadNext} isLoading={data.isLoading} album={data.lastLoadedAlbum} />
        )
      }
    </div>
  )
}

export default observer(Photos);
