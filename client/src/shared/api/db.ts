import PouchDB from 'pouchdb';
import PouchDBMango from 'pouchdb-find';
import type {AllDocs} from './types';

PouchDB.plugin(PouchDBMango);

const localDB = new PouchDB<AllDocs>('client_local_db');

const remoteDB = new PouchDB(import.meta.env.VITE_COUCHDB_URL_DATABASE, {
  auth: {
    username: import.meta.env.VITE_COUCHDB_USER,
    password: import.meta.env.VITE_COUCHDB_PASS,
  },
});

localDB
  .sync(remoteDB, {
    live: true,
    retry: true,
  })
  .on('change', (info) => console.log('[SYNC] Change:', info))
  .on('paused', (err) => console.log('[SYNC] Paused:', err))
  .on('active', () => console.log('[SYNC] Active'))
  .on('error', (err) => console.log('[SYNC] Error:', err))
  .on('complete', (info) => console.log('[SYNC] Complete:', info));

localDB.createIndex({
  index: {fields: ['type'], name: 'TypeIndex'},
});

export const db = localDB;
