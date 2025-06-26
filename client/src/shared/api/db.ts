import PouchDB from 'pouchdb';

const localDB = new PouchDB('my_local_db');

const remoteDB = new PouchDB('http://localhost:5984/database', {
  auth: {
    username: 'admin',
    password: 'password',
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
