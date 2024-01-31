import React, { useEffect, useMemo, useState } from 'react';
import './VirtualizedList.css';
import { useElementSize } from 'src/hooks/useElementSize';
import { throttle } from 'lodash';

const VirtulizedList = () => {
  const [containerRef, size] = useElementSize();
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {}, []);

  const { height: containerHeight } = size;

  const onScroll = useMemo(
    () =>
      throttle(
        //fix type
        function (e: any) {
          setScrollPosition(e.target.scrollTop);
          console.log(scrollPosition);
        },
        50,
        { leading: false }
      ),
    [scrollPosition]
  );

  const visibleChidren = () => {
    //start index and end index

    const startIndex = Math.max(Math.floor(scrollPosition / 40), 0); //40 is rowhight //upddate as required

    //!improve logic for end index
    const endIndex = Math.min(
      Math.ceil(scrollPosition + containerHeight / 40 - 1),
      Array.from(new Array(70)).length - 1
    );

    return Array.from(new Array(70))
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
