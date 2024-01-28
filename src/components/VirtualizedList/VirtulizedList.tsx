import React, { useRef } from 'react';
import './VirtualizedList.css';
const VirtulizedList = () => {
  const containerRef = useRef<HTMLUListElement | null>(null);

  const onScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement;
    console.log(target.scrollTop); //! use memo and throttle here
  };
  return (
    <ul className="container" ref={containerRef} onScroll={onScroll}>
      {Array.from(new Array(30)).map((item, index) => (
        <li key={index}>item</li>
      ))}
      <li>heks</li>
    </ul>
  );
};

export default VirtulizedList;
