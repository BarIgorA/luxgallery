import { FC } from 'react';
import { createPortal } from 'react-dom';

// Interfaces
import { IChildren } from '../../../interfaces';

// Custom Hooks
import usePortal from '../../../hooks/usePortal';


const Portal:FC<IChildren> = ({ children }) => {
  const target = usePortal();

  return createPortal(children, target);
}

export default Portal;
