import type {WidthPredicate} from '@/shared/components/resizer';
import {MIN_LEFT_SIDEBAR_WIDTH} from './constants';

export const widthPredicate: WidthPredicate = (startX, currentX, currentWidth) => {
  const newWidth = Math.floor(currentX - startX + currentWidth);

  if (newWidth < MIN_LEFT_SIDEBAR_WIDTH) {
    return {width: MIN_LEFT_SIDEBAR_WIDTH};
  }

  const bodyWidth = document.body.getBoundingClientRect().width;

  if (newWidth > bodyWidth - MIN_LEFT_SIDEBAR_WIDTH) {
    return {width: bodyWidth - MIN_LEFT_SIDEBAR_WIDTH};
  }

  return {width: newWidth};
};
