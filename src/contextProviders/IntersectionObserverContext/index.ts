import React from 'react'

// Interfaces
import { IntersectionObserve } from '../../interfaces';


const IntersectionObserverContext = React.createContext<IntersectionObserve | null>(null);


export default IntersectionObserverContext;
