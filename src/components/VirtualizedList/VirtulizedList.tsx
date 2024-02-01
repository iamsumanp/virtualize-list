import React, { useMemo, useState } from 'react';
import './VirtualizedList.css';
import { useElementSize } from 'src/hooks/useElementSize';
import { throttle } from 'lodash';

const VirtulizedList = () => {
  const [containerRef, size] = useElementSize();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isVirtualizationEnabled, setIsVirtualizationEnabled] = useState(true);

  const { height: containerHeight } = size;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsVirtualizationEnabled(event.target.checked);
  };

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
      Math.ceil((scrollPosition + containerHeight) / 40 - 1), //adjust the index of the array
      Array.from(new Array(15000)).length - 1
    );

    if (isVirtualizationEnabled) {
      return Array.from(new Array(15000))
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
    } else {
      return Array.from(new Array(15000)).map((item, index) => (
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
    }
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
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {' '}
        <label className="switch">
          <input
            type="checkbox"
            checked={isVirtualizationEnabled}
            onChange={handleChange}
          />
          <span className="slider round"></span>
        </label>
        <span>
          {isVirtualizationEnabled
            ? 'Virtualization Enabled'
            : 'Virtualization Disabled'}
        </span>
      </div>
      <ul
        className="container"
        ref={containerRef}
        onScroll={onScroll}
        style={{ position: 'relative' }}
      >
        {visibleChidren()}
      </ul>
    </div>
  );
};

export default VirtulizedList;
