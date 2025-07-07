import {Button} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {greet, init, draw_rectangle, on_mouse_move_rectangle} from 'web-blueprints-diagram';
import {useEditorStore} from '@/entities/editor';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';

export type ViewEditorProps = {} & PropsOf<HTMLDivElement>;

export const ViewEditor = (props: ViewEditorProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn('center', className).build();
  const openedFile = useEditorStore((state) => state.openedFile);

  const [localValue, setLocalValue] = useState<string | undefined>();

  useEffect(() => {
    if (openedFile) {
      openedFile?.content.text().then((value) => setLocalValue(value));
      return;
    }

    setLocalValue(undefined);
  }, [openedFile]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draw_rectangle(Math.floor(x), Math.floor(y), 50, 'green');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    on_mouse_move_rectangle(Math.floor(x), Math.floor(y));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    init();
  }, [localValue]);

  return (
    <div className={classNames} {...anotherProps}>
      {localValue !== undefined && (
        <div className='center fd-column'>
          {openedFile?.path}

          <canvas
            ref={canvasRef}
            id='canvas'
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            width={500}
            height={500}
            style={{border: '1px solid black'}}
          />

          <Button
            onClick={() => {
              greet();
            }}
          >
            Hello World WASM
          </Button>
        </div>
      )}
    </div>
  );
};
