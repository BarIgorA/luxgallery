import React, { FC } from 'react'

// Models
import PhotoModel from '../../models/PhotoModel';

// Styles
import styles from './styles.module.scss';


const Photos: FC<{data: typeof PhotoModel.Type[]}> = ({ data }) => {
  const album = data[0] ? data[0].getAlbum() : {title: ''};
  return (
    <>
    <span>{album.title}</span>
    <div className={styles.Photos}>
      {data.map((item, key) => (
        <div key={key} className={styles.photo} >
          <img src={item.thumbnailUrl} alt={item.title} />
        </div>
      ))}
    </div>
    </>
  )
}

export default Photos;
