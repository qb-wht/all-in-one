import {getFileName} from '../lib/files';
import type {CRUD, Observable, Unsubscribe} from '../types';
import {CRUDPouchDB} from './CRUDPouchDB';
import {projectService, type ProjectService} from './ProjectService';
import {db as pouchDB} from './db';
import type {AllDocs, DocInfo, File} from './types';
import type {CreateFileDataPrivate, CreateFileDataPublic} from './types';

export class FileService extends CRUDPouchDB<File> implements CRUD, Observable<File, DocInfo> {
  constructor(
    db: PouchDB.Database<AllDocs>,
    private projectService: ProjectService,
  ) {
    super(db);
  }

  async create(file: CreateFileDataPublic): Promise<File> {
    const project = await this.projectService.get(file.projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    const fileData: CreateFileDataPrivate = {
      ...file,
      type: 'file',
      name: getFileName(file.path),
    };

    // _id и _rev не обязательно указывать, DB создает их сама
    const res = await this.db.post(fileData as File);

    project.fileIds.push(res.id);
    project.fileCount = project.fileIds.length;

    await this.projectService.update(project);

    return this.get(res.id);
  }

  async getAll(projectId: string): Promise<File[]> {
    const res = await this.db.find({
      selector: {type: 'file', projectId: projectId},
    });

    return res.docs as File[];
  }

  subscribe(onUpdate?: (project: File) => void, onDelete?: (info: DocInfo) => void): Unsubscribe {
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

        onUpdate?.(res.doc as File);
      });

    return () => {
      changes.cancel();
    };
  }
}

export const fileService = new FileService(pouchDB, projectService);
