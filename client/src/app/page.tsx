'use client';

import {useEffect, useState} from 'react';
import {CodeEditor} from '../1_widgets/codeEditor';
import {ViewEditor} from '../1_widgets/viewEditor';
import {initialContent} from './constants';
import {APIService, IndexedDBEngine, ServerEngine} from '@/4_shared/lib/api';

let api: APIService;

export default function Home() {
  const [isSource, setIsSource] = useState(true);
  const [isLocal, setIsLocal] = useState(true);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (isLocal) {
      api = new APIService(new IndexedDBEngine());
      return;
    }

    api = new APIService(new ServerEngine());
  }, [isLocal]);

  useEffect(() => {
    api
      .getUsers()
      .then((users) => {
        console.log('Users', users);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [isLocal]);

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
