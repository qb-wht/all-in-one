import {Component} from './Component';
import './4_shared/styles/index.css';
import {CodeEditor} from './1_widgets/codeEditor';
import {ViewEditor} from './1_widgets/viewEditor';
import {useState} from 'react';
import {initialContent} from './constants';

function App() {
  const [isSource, setIsSource] = useState(true);
  const [isLocal, setIsLocal] = useState(true);
  const [content, setContent] = useState(initialContent);

  return (
    <div className='page gap-1'>
      <div className='row gap-1'>
        <button onClick={() => setIsLocal((p) => !p)}>
          {isLocal ? 'Use Local' : 'Use Server'}
        </button>

        <button onClick={() => setIsSource((p) => !p)}>
          {isSource ? 'Open View Editor' : 'Open Code Editor'}
        </button>
      </div>

      <Component />

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

export default App;
