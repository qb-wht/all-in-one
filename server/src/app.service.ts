import {Injectable} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private baseURL = process.env.COUCHDB_URL || 'http://localhost:5984';
  private auth = {
    username: process.env.COUCHDB_USER || 'admin',
    password: process.env.COUCHDB_PASS || 'password',
  };

  async getAllDocs(dbName: string) {
    const res = await axios.get(`${this.baseURL}/${dbName}/_all_docs?include_docs=true`, {
      auth: this.auth,
    });
    return res.data;
  }

  async createDoc(dbName: string, doc: any) {
    const res = await axios.post(`${this.baseURL}/${dbName}`, doc, {
      auth: this.auth,
    });
    return res.data;
  }
}
