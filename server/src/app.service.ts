import {Injectable, OnModuleInit} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PouchDB = require('pouchdb');

const localDB = new PouchDB('server_local_db');
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

@Injectable()
export class AppService implements OnModuleInit {
  private unsubscribe?: () => void;

  async onModuleInit() {
    const result = await db.allDocs({include_docs: true});
    const projects = result.rows.map((r) => r.doc!).filter(Boolean);

    console.log('[DB] Projects loaded', projects);

    const changes = db
      .changes({
        since: 'now',
        live: true,
        include_docs: true,
      })
      .on('change', (data) => {
        console.log('[CHANGES] Projects updated', data);
      });

    this.unsubscribe = () => changes.cancel();
  }

  stopListening() {
    this.unsubscribe?.();
  }

  async createProject(title: string) {
    await db.post({title});
  }
}
