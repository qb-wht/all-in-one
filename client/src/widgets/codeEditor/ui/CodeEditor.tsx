import {Editor, useMonaco} from '@monaco-editor/react';
import s from './CodeEditor.module.css';
import {useEffect} from 'react';
import {useCodeEditorStore} from '../model';
import type {PropsOf} from '@/shared/types';
import {cn} from '@/shared/lib/classNames';

export type CodeEditorProps = {} & PropsOf<HTMLDivElement>;

export const CodeEditor = (props: CodeEditorProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn(s.editorSettingsBar, className).build();

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
