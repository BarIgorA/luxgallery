import React, { useRef, useEffect, memo } from 'react';

import logo from '../../assets/luxoft.svg';

// Styles
import styles from './styles.module.scss';


const Sentinel: React.FC<{callback(): void}> = ({ callback }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const div = ref.current;
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === div && entry.isIntersecting) {
            callback();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px 200% 0px',
      },
    );
    if (div) {
      observer.observe(div);
    }

    return () => {
      if (div) {
        observer.unobserve(div);
      };
    };
  }, [callback]);

  return (
    <div ref={ref} className={styles.Sentinel} >
      <img alt='Luxoft' src={logo} ></img>
      <div className={styles.loading} >Loading...</div>
    </div>
  );
}


export default memo(Sentinel);
