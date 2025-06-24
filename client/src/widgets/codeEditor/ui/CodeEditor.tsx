import {Editor, useMonaco} from '@monaco-editor/react';
import s from './styles.module.css';
import {useEffect} from 'react';
import {useCodeEditorStore} from '../model';

export const CodeEditor = () => {
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
          [/[{}()\[\]]/, '@brackets'],
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
    <div className={s.codeEditorContainer}>
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
