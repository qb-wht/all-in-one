import {useEffect} from 'react';

export type UseResizerOptions = {
  bodyRef: React.RefObject<HTMLDivElement | null>;
  resizerRef: React.RefObject<HTMLDivElement | null>;
  type: 'horizontal' | 'vertical';
};

export const useResizer = ({bodyRef, resizerRef}: UseResizerOptions) => {
  useEffect(() => {
    const body = bodyRef.current;
    const resizer = resizerRef.current;

    if (!body || !resizer) return;

    const onMouseDown = () => {
      console.log('onMouseDown');
    };

    const onMouseUp = () => {
      console.log('onMouseUp');
    };

    resizer.addEventListener('mousedown', onMouseDown);
    resizer.addEventListener('mouseup', onMouseUp);
  }, []);
};
