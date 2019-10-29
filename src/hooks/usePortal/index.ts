import { useRef, useEffect } from 'react';


const UsePortal = () => {
  const ref = useRef(document.createElement('div'));
  useEffect(() => {
    const div = ref.current;
    const modalRoot = document.querySelector('#modal');
    if (modalRoot) {
      modalRoot.appendChild(ref.current);
    }

    return () => {
      div.remove();
    };
  }, [])

  return ref.current;
};


export default UsePortal;