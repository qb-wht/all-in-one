import { Editor, OnChange, useMonaco } from "@monaco-editor/react";
import s from "./styles.module.css";
import { useEffect } from "react";

type CodeEditorProps = {
  content?: string;
  onChange?: OnChange;
};

export const CodeEditor = ({ content, onChange }: CodeEditorProps) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;

    monaco.languages.register({ id: "web-blueprints" });

    monaco.languages.setMonarchTokensProvider("web-blueprints", {
      tokenizer: {
        root: [
          [/\b(style|logic|div|event)\b/, "keyword"],
          [/[{}()\[\]]/, "@brackets"],
          [/[a-z_$][\w$]*/, "identifier"],
          [/\d+/, "number"],
          [/".*?"/, "string"],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration("web-blueprints", {
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
      ],
    });
  }, [monaco]);

  return (
    <div className={s.codeEditorContainer}>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={"web-blueprints"}
        defaultValue={content}
        onChange={onChange}
        theme="vs-light"
      />
    </div>
  );
};
