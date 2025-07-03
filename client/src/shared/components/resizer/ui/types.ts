export type NewSizes = {
  newWidth?: number;
  newHeight?: number;
  isForceApply?: boolean;
};

export type OnMouseMove = (e: MouseEvent, newSizes: Readonly<NewSizes>) => void;

export type UseResizerOptions = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  resizerRef: React.RefObject<HTMLDivElement | null>;
  type: 'horizontal' | 'vertical';
  heightPredicate?: HeightPredicate;
  widthPredicate?: WidthPredicate;
  onMouseUp?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseMove?: OnMouseMove;
  depths?: Array<unknown>;
};

export type HeightPredicate = (
  startY: number,
  currentY: number,
  currentHeight: number,
) => {height: number; isForceApply?: boolean};

export type WidthPredicate = (
  startX: number,
  currentX: number,
  currentWidth: number,
) => {width: number; isForceApply?: boolean};
