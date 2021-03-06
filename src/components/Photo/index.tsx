import React, { FC, useContext, useRef, useEffect } from 'react';

// Interfaces
import { IPhoto } from '../../interfaces';

// Context
import IntersectionObserverContext from '../../contextProviders/IntersectionObserverContext';

// Custom
import ModalPhoto from '../ModalPhoto';

// Styles
import styles from './styles.module.scss';


const Photo: FC<IPhoto> = ({ photo }) => {
  const { thumbnailUrl, id, title, showMe } = photo;
  const ref = useRef<HTMLDivElement | null>(null);
  const observerInContext = useContext(IntersectionObserverContext);

  useEffect(() => {
    const observer = observerInContext;
    const div = ref.current;

    if (div && observer) {
      observer.observe(div);

      return () => {
        observer.unobserve(div);
      };
    }
  }, [observerInContext]);

  return (
    <div key={id} className={styles.Photo} ref={ref} data-src={thumbnailUrl} >
      <img
        className={styles.lazyImage}
        src=''
        alt={title}
        title={title}
        onClick={showMe}
      />
      <ModalPhoto photo={photo} />
    </div>
  )
}

export default Photo;
