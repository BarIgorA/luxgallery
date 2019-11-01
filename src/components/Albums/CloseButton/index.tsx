import React, { FC, useCallback, memo } from 'react';

// Styles
import styles from '../styles.module.scss';


const CloseButton: FC<{callback(arg: null): void}> = ({ callback }) => {
  const onClick = useCallback(() => {callback(null);}, [callback]);

  return (
    <button
      type="button"
      className={styles.closeAlbum}
      onClick={onClick}
    >
      Close
    </button>
  )
}


export default memo(CloseButton);
