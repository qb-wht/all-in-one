import {Editor, useMonaco} from '@monaco-editor/react';
import {useEffect} from 'react';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import {useCodeEditorStore} from '../model';
import s from './CodeEditor.module.css';

export type CodeEditorProps = {} & PropsOf<HTMLDivElement>;

export const CodeEditor = (props: CodeEditorProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn(s.codeEditorContainer, className).build();

  const monaco = useMonaco();
  const content = useCodeEditorStore((state) => state.content);
  const changeContent = useCodeEditorStore((state) => state.changeContent);

  useEffect(() => {
    if (!monaco) return;

    monaco.languages.register({id: 'web-blueprints'});

    monaco.languages.setMonarchTokensProvider('web-blueprints', {
      tokenizer: {
        root: [
          [/\b(style|logic|div|event)\b/, 'keyword'],
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

  return (
    <div className={classNames} {...anotherProps}>
      <Editor
        height='100%'
        width='100%'
        defaultLanguage={'web-blueprints'}
        defaultValue={content}
        onChange={(value) => changeContent(value || '')}
        theme='vs-light'
      />
    </div>
  );
};
