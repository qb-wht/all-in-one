/* eslint-disable @typescript-eslint/no-require-imports */
import {Injectable, OnModuleInit} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

const PouchDB = require('pouchdb');
const PouchDBMango = require('pouchdb-find');

PouchDB.plugin(PouchDBMango);

@Injectable()
export class AppService implements OnModuleInit {
  private readonly localDB;
  private readonly remoteDB;
  private unsubscribe?: () => void;

  constructor(private configService: ConfigService) {
    this.localDB = new PouchDB('server_local_db');

    this.remoteDB = new PouchDB(this.configService.get<string>('COUCHDB_URL_DATABASE'), {
      auth: {
        username: this.configService.get<string>('COUCHDB_USER'),
        password: this.configService.get<string>('COUCHDB_PASS'),
      },
    });

    this.setupSync();
  }

  private setupSync() {
    this.localDB
      .sync(this.remoteDB, {
        live: true,
        retry: true,
      })
      .on('change', (info) => console.log('[SYNC] Change:', info))
      .on('paused', (err) => console.log('[SYNC] Paused:', err))
      .on('active', () => console.log('[SYNC] Active'))
      .on('error', (err) => console.log('[SYNC] Error:', err));
  }

  async onModuleInit() {
    const result = await this.localDB.allDocs({include_docs: true});
    const projects = result.rows.map((r) => r.doc!).filter(Boolean);

    console.log('[DB] Projects loaded', projects);

    const changes = this.localDB
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
    await this.localDB.post({title});
  }
}
