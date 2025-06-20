'use client';

import {useEffect, useState} from 'react';
import {CodeEditor} from '../1_widgets/codeEditor';
import {ViewEditor} from '../1_widgets/viewEditor';
import {initialContent} from './constants';
import {APIService, IndexedDBEngine} from '@/4_shared/lib/api';

const api = new APIService(new IndexedDBEngine());

export default function Home() {
  const [isSource, setIsSource] = useState(true);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    api
      .getUsers()
      .then((users) => {
        console.log('Users', users);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, []);

  return (
    <div className='page gap-1'>
      <div>
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
