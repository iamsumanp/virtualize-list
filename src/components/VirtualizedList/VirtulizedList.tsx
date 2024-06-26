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

    const startIndex = Math.max(Math.floor(scrollPosition / 40), 0); //40 is rowhight //upddate as required //to be passed in props or use globally

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
              // |---------------------|  <- Container start (0px)
              // |                     |
              // |   Item 0            |  <- startIndex = 0, index = 0
              // |---------------------|
              // |                     |  <- Gap (5px)
              // |---------------------|
              // |   Item 1            |  <- startIndex = 0, index = 1
              // |---------------------|
              // |                     |  <- Gap (5px)
              // |---------------------|
              // |   Item 2            |  <- startIndex = 0, index = 2
              // |---------------------|
              // |                     |  <- Gap (5px)
              // |---------------------|
              // |   Item 3            |  <- startIndex = 0, index = 3
              // |---------------------|
              // |                     |  <- Gap (5px)
              // |---------------------|
              // |   Item 4            |  <- startIndex = 0, index = 4
              // |---------------------|
              // |                     |
              // |---------------------|  <- Container end

              // In this diagram, each "Item X" represents a list item. The startIndex and index for each item are also shown. As you can see, startIndex is 0 for all items because we're viewing the list from the very top. The index increases for each item, starting from 0 for the first item.
              // Now, let's say you've scrolled down such that Item 3 is now the first visible item:

              // |---------------------|  <- Container start (0px)
              // |                     |
              // |   Item 3            |  <- startIndex = 3, index = 0
              // |---------------------|
              // |                     |  <- Gap (5px)
              // |---------------------|
              // |   Item 4            |  <- startIndex = 3, index = 1
              // |---------------------|
              // |                     |  <- Gap (5px)
              // |---------------------|
              // |   Item 5            |  <- startIndex = 3, index = 2
              // |---------------------|
              // |                     |  <- Gap (5px)
              // |---------------------|
              // |   Item 6            |  <- startIndex = 3, index = 3
              // |---------------------|
              // |                     |  <- Gap (5px)
              // |---------------------|
              // |   Item 7            |  <- startIndex = 3, index = 4
              // |---------------------|
              // |                     |
              // |---------------------|  <- Container end

              // In this case, startIndex is 3 because Item 3 is the first visible item. The index starts from 0 for the first visible item (Item 3), and increases for each subsequent item.

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
