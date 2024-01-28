import React, { useState } from 'react';

const Test = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <span>Click to increase counter</span>
      <br />
      <button onClick={() => setCount(count + 1)}>Click me {count}</button>
    </div>
  );
};

export default Test;
