import React, { useMemo, useState } from 'react';
import './VirtualizedList.css';
import { useElementSize } from 'src/hooks/useElementSize';
import { throttle } from 'lodash';

const VirtulizedList = () => {
  const [containerRef, size] = useElementSize();
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const { height: containerHeight } = size;

  const onScroll = useMemo(
    () =>
      throttle(
        function (e: React.UIEvent<HTMLUListElement>) {
          const target = e.target as HTMLUListElement;
          setScrollPosition(target.scrollTop);
        },
        50,
        { leading: false }
      ),
    []
  );

  const visibleChidren = () => {
    //start index and end index

    const startIndex = Math.max(Math.floor(scrollPosition / 40), 0); //40 is rowhight //upddate as required

    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / 40 - 1), // -1 because of  index that always  starts with 0
      Array.from(new Array(300000)).length - 1
    );

    return Array.from(new Array(300000))
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <li
          className="listyle"
          style={{
            position: 'absolute',
            top: (startIndex + index) * 40 + index * 5,
            height: 40,
            left: 0,
            right: 0,
          }}
        >
          {generateRandomText()}
        </li>
      ));
  };
  const generateRandomText = () => {
    const alphabets =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

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
    <ul
      className="container"
      ref={containerRef}
      onScroll={onScroll}
      style={{ position: 'relative' }}
    >
      {visibleChidren()}
    </ul>
  );
};

export default VirtulizedList;
