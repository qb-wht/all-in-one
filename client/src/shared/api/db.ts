import PouchDB from 'pouchdb';

const localDB = new PouchDB('client_local_db');

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
  .on('error', (err) => console.log('[SYNC] Error:', err));

export const db = localDB;
