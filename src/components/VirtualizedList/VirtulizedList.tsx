import React, { useEffect, useRef } from 'react';
import './VirtualizedList.css';
import { useElementSize } from 'src/hooks/useElementSize';
const VirtulizedList = () => {
  // const containerRef = useRef<HTMLUListElement | null>(null);

  const [containerRef, size] = useElementSize();

  console.log('containerRef,size', containerRef, size);

  useEffect(() => {}, []);

  const { height: containerHeight } = size;

  console.log(containerHeight);

  const onScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement;
    console.log(target.scrollTop); //! use memo and throttle here
  };
  const generateRandomText = () => {
    const alphabets =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // const alphabetsCount = alphabets.length;

    const expectedLength = 40;
    let randomText = '';

    for (let i = 0; i < expectedLength; i++) {
      randomText =
        randomText +
        alphabets.charAt(Math.floor(Math.random() * expectedLength));
    }

    return randomText;
  };
  return (
    <ul className="container" ref={containerRef} onScroll={onScroll}>
      {Array.from(new Array(30)).map((item, index) => (
        <li key={index}>{generateRandomText()}</li>
      ))}
      <li></li>
    </ul>
  );
};

export default VirtulizedList;
