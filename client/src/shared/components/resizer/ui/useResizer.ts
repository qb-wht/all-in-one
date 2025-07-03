import {useEffect} from 'react';
import s from './Resizer.module.css';
import type {NewSizes, UseResizerOptions} from './types';

export const useResizer = (params: UseResizerOptions) => {
  const {
    containerRef,
    resizerRef,
    heightPredicate,
    widthPredicate,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    depths,
  } = params;
  useEffect(() => {
    const container = containerRef.current;
    const resizer = resizerRef.current;
    if (!container || !resizer) return;

    container.classList.add(s.relative);

    const startCoords = {x: 0, y: 0};
    const newSizes: NewSizes = {};
    let currentRect: DOMRect;

    let mouseMoveHandler: (e: MouseEvent) => void = () => {};

    if (heightPredicate) {
      mouseMoveHandler = (e) => {
        const newHeight = heightPredicate(startCoords.y, e.clientY, currentRect.height);
        const heightPx = `${newHeight.height}px`;

        container.style.minHeight = heightPx;
        container.style.maxHeight = heightPx;
        container.style.height = heightPx;

        if (newSizes.newWidth !== undefined) {
          newSizes.newWidth = undefined;
        }

        newSizes.newHeight = newHeight.height;
        newSizes.isForceApply = newHeight.isForceApply;

        onMouseMove?.(e, newSizes);
      };
    } else if (widthPredicate) {
      mouseMoveHandler = (e) => {
        const newWidth = widthPredicate(startCoords.x, e.clientX, currentRect.width);
        const widthPx = `${newWidth.width}px`;

        container.style.minWidth = widthPx;
        container.style.maxWidth = widthPx;
        container.style.width = widthPx;

        if (newSizes.newHeight !== undefined) {
          newSizes.newHeight = undefined;
        }

        newSizes.newWidth = newWidth.width;
        newSizes.isForceApply = newWidth.isForceApply;

        onMouseMove?.(e, newSizes);
      };
    }

    const mouseUpHandler = (e: MouseEvent) => {
      resizer.classList.remove(s.active);

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      onMouseUp?.(e);
    };

    const mouseDownHandler = (e: MouseEvent) => {
      resizer.classList.add(s.active);

      currentRect = container.getBoundingClientRect();
      startCoords.x = e.clientX;
      startCoords.y = e.clientY;

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

      onMouseDown?.(e);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);

    return () => {
      container.classList.remove(s.relative);

      resizer.removeEventListener('mousedown', mouseDownHandler);

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [depths]);
};
