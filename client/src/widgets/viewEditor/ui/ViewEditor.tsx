import {Button} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {greet, CanvasService, ParseService} from 'web-blueprints-diagram';
import {useEditorStore} from '@/entities/editor';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';

export type ViewEditorProps = {} & PropsOf<HTMLDivElement>;

export const ViewEditor = (props: ViewEditorProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn('center', className).build();
  const openedFile = useEditorStore((state) => state.openedFile);

  const [localValue, setLocalValue] = useState<string | undefined>();

  const canvasServiceRef = useRef<CanvasService | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (openedFile) {
      openedFile?.content.text().then((value) => setLocalValue(value));
      return;
    }

    setLocalValue(undefined);
  }, [openedFile]);

  useEffect(() => {
    if (localValue) {
      const canvas = new CanvasService();
      canvas.draw_grid(20, '#f5f5f5');
      canvasServiceRef.current = canvas;

      const a = ParseService.new();

      a.parse(localValue);

      return;
    }

    canvasServiceRef.current = null;
  }, [localValue]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasService = canvasServiceRef.current;
    if (!canvasService) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    canvasService.add_node(Math.floor(x), Math.floor(y), 100, 60, 'green');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasService = canvasServiceRef.current;
    if (!canvasService) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    canvasService.on_mouse_move(Math.floor(x), Math.floor(y));
  };

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
            width={1200}
            height={600}
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
