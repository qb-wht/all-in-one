'use client';

import {useEffect, useState} from 'react';
import {CodeEditor} from '../1_widgets/codeEditor';
import {ViewEditor} from '../1_widgets/viewEditor';
import {initialContent} from './constants';
import {connection, resolveRequest} from '@/4_shared/lib/indexedDB';
import {resolveTransaction} from '@/4_shared/lib/indexedDB';

export default function Home() {
  const [isSource, setIsSource] = useState(true);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    connection.then((db) => {
      const tr = db.transaction(['users', 'logs']);

      const users = tr.objectStore('users').index('age').getAll(IDBKeyRange.upperBound(42));
      const logs = tr.objectStore('logs').getAll();

      resolveRequest(users).then((v) => {
        console.log(v, 'users');
      });

      resolveRequest(logs).then((v) => {
        console.log(v, 'logs');
      });

      resolveTransaction(tr).then(() => {
        console.log(users.result);
        console.log(logs.result);
      });
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
