import React, { Context } from 'react'

interface IntersectionObserve {
  observe(target: HTMLElement): void
};

const IntersectionObserverContext = React.createContext<IntersectionObserve | null>(null);


export default IntersectionObserverContext;
