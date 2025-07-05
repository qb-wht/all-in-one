import {Editor, useMonaco} from '@monaco-editor/react';
import {useEffect, useState} from 'react';
import {useEditorStore} from '@/entities/editor';
import {updateFile, type FileNode} from '@/entities/file';
import {cn} from '@/shared/lib/classNames';
import {useAbortableDebounce} from '@/shared/lib/hooks';
import type {PropsOf} from '@/shared/types';
import s from './CodeEditor.module.css';

export type CodeEditorProps = {} & PropsOf<HTMLDivElement>;

export const CodeEditor = (props: CodeEditorProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn(s.codeEditorContainer, className).build();

  const monaco = useMonaco();
  const openedFile = useEditorStore((state) => state.openedFile);
  const changeOpenedFile = useEditorStore((state) => state.changeOpenedFile);
  const [localValue, setLocalValue] = useState<string | undefined>();

  useEffect(() => {
    if (!monaco) return;

    monaco.languages.register({id: 'web-blueprints'});

    monaco.languages.setMonarchTokensProvider('web-blueprints', {
      tokenizer: {
        root: [
          [/\b(style|logic|div|button|event|state|import)\b/, 'keyword'],
          [/[{}()[\]]/, '@brackets'],
          [/[a-z_$][\w$]*/, 'identifier'],
          [/\d+/, 'number'],
          [/".*?"/, 'string'],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration('web-blueprints', {
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
      ],
      autoClosingPairs: [
        {open: '{', close: '}'},
        {open: '[', close: ']'},
        {open: '(', close: ')'},
        {open: '"', close: '"'},
      ],
    });
  }, [monaco]);

  useEffect(() => {
    if (openedFile) {
      openedFile?.content.text().then((value) => setLocalValue(value));
      return;
    }

    setLocalValue(undefined);
  }, [openedFile]);

  const {fn} = useAbortableDebounce((value: string, openedFile: FileNode) => {
    updateFile({
      ...openedFile,
      content: new Blob([value || ''], {type: 'text/plain'}),
    }).then((file) => changeOpenedFile({...openedFile, ...file}));
  }, 500);

  return (
    <div className={classNames} {...anotherProps}>
      {localValue !== undefined && (
        <Editor
          height='100%'
          width='100%'
          value={localValue}
          defaultLanguage={'web-blueprints'}
          onChange={(value) => {
            if (openedFile) {
              fn(value || '', openedFile);
            }
          }}
          theme='vs-light'
        />
      )}
    </div>
  );
};
