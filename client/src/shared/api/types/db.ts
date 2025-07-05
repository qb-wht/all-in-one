import type {PartialWithoutKeys} from '@/shared/types';

export type DocTypes = 'project' | 'file';

export interface PouchDBDocument {
  type: DocTypes;
  _id: string;
  _rev: string;
}

export interface DocInfo {
  _id: string;
  _rev: string;
}

// Project
export interface ProjectData {
  name: string;
  fileCount: number;
  fileIds: string[];
}

export interface Project extends PouchDBDocument, ProjectData {
  type: 'project';
}

export interface CreateProjectDataPublic extends PartialWithoutKeys<Project, 'name'> {}

export interface CreateProjectDataPrivate extends PartialWithoutKeys<Project, 'name' | 'type'> {}

// File
export interface FileData {
  name: string;
  path: string;
  content: Blob;
  projectId: string;
}

export interface File extends PouchDBDocument, FileData {
  type: 'file';
}

export interface CreateFileDataPublic extends PartialWithoutKeys<File, 'path' | 'projectId'> {}

export interface CreateFileDataPrivate
  extends PartialWithoutKeys<File, 'path' | 'type' | 'projectId' | 'content'> {}

export type AllDocs = Project | File;
