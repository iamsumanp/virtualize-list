import { useCallback, useState } from 'react';
import useIsoMorphicLayoutEffect from './useIsoMorphicLayoutEffect';
interface Size {
  width: number;
  height: number;
}
export const useElementSize = <T extends HTMLElement = HTMLUListElement>(): [
  (node: T | null) => void,
  Size,
] => {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  //cache function so if height and widht are same donot run the fn
  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  //? one more thing to be added

  // run handlesize when ever window is resized
  // use useeventlistener from https://usehooks-ts.com/react-hook/use-event-listener

  //this is for whenever the containerref height and width chnages. the handlesize should be run
  useIsoMorphicLayoutEffect(() => {
    handleSize();
  }, [ref]); //this either uses uselayouteffect when dom is available instantly in client side and //uses useeffect if it is running in server side as uselayouteffect will give warning

  return [setRef, size];
};
