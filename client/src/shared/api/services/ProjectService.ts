import type {CRUD, Observable, Unsubscribe} from '@/shared/types';
import {db as couchDB} from '../db';
import type {CreateProjectDataPrivate, CreateProjectDataPublic, DocInfo, Project} from '../types';
import {CRUDPouchDB} from './CRUDPouchDB';

export class ProjectService
  extends CRUDPouchDB<Project>
  implements CRUD, Observable<Project, DocInfo>
{
  async create(data: CreateProjectDataPublic): Promise<Project> {
    const projectData: CreateProjectDataPrivate = {
      ...data,
      type: 'project',
      fileCount: 0,
      fileIds: [],
    };

    // _id и _rev не обязательно указывать, DB создает их сама
    const res = await this.db.post(projectData as Project);

    return this.get(res.id);
  }

  async getAll(): Promise<Project[]> {
    const res = await this.db.find({
      selector: {type: 'project'},
    });

    return res.docs as Project[];
  }

  subscribe(
    onUpdate?: (project: Project) => void,
    onDelete?: (info: DocInfo) => void,
  ): Unsubscribe {
    const changes = this.db
      .changes({
        since: 'now',
        live: true,
        include_docs: true,
      })
      .on('change', (res) => {
        if (res.deleted) {
          onDelete?.(res.doc as {_id: string; _rev: string});
          return;
        }

        onUpdate?.(res.doc as Project);
      });

    return () => {
      changes.cancel();
    };
  }
}

export const projectService = new ProjectService(couchDB);
