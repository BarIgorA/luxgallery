import React, { useRef, useEffect } from 'react';

// Styles
import styles from './styles.module.scss';


const Sentinel: React.FC<{callback(): void, isLoading: boolean, album: number, isAllLoaded: boolean}> = (
  { callback, isLoading, album, isAllLoaded }
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const div = ref.current;
    if (div && !isLoading) {
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
          rootMargin: '0px 0px 100% 0px',
        },
      );

      observer.observe(div);

      return () => observer.unobserve(div);
    }
  }, [callback, isLoading]);

  return (
    <div ref={ref} className={styles.Sentinel} >
      {
        !isAllLoaded
          ? (
              <>
                <div className={styles.loading} >Loading...</div>
                <div>{`${album} albums loaded`}</div>
              </>
            )
          : null
      }
    </div>
  );
}


export default Sentinel;
