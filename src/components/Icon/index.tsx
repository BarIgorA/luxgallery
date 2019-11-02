import React, { FC } from 'react';


const Icon: FC<{ svg: string }> = ({ svg }) => <i dangerouslySetInnerHTML={{ __html: svg }}/>;


export default Icon;