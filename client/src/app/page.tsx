"use client";

import { useState } from "react";
import { CodeEditor } from "./codeEditor";
import { ViewEditor } from "./viewEditor";
import { initialContent } from "./constants";

export default function Home() {
  const [isSource, setIsSource] = useState(true);
  const [content, setContent] = useState(initialContent);

  return (
    <div className="page gap-1">
      <div>
        <button onClick={() => setIsSource((p) => !p)}>
          {isSource ? "Open View Editor" : "Open Code Editor"}
        </button>
      </div>

      {isSource ? (
        <CodeEditor
          content={content}
          onChange={(value) => {
            if (value) {
              setContent(value);
            }
          }}
        />
      ) : (
        <ViewEditor />
      )}
    </div>
  );
}
