import React, { FC, useMemo } from 'react';

// Interfaces
import { TPhoto } from '../../../interfaces';

//Custom components
import Photo from '../../Photo';

// Styles
import styles from './styles.module.scss';


const SearchResults: FC<{ photos: TPhoto[], searchTerm: string, isAllLoaded: boolean }> = ({ photos, searchTerm, isAllLoaded }) => {
  const filteredPhotos = photos.filter(photo => photo.title.includes(searchTerm));
  const memoizedNothingFound = useMemo(() => (
    <div className={styles.NothingFound}>
      {
        isAllLoaded
          ? 'Nothing found.'
          : 'Nothing to show yet! Wait please.'
      }
    </div>
  ), [isAllLoaded]);

  return (
    <div className={styles.Grid}>
      {
        filteredPhotos.length
        ? filteredPhotos.map((photo) => (
            <Photo key={photo.id} photo={photo} />
          ))
        : memoizedNothingFound
      }
    </div>
  );
}

export default SearchResults;
