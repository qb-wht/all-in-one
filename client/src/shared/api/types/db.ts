export type DocTypes = 'project' | 'file';

export interface PouchDBDocument {
  type: DocTypes;
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

// File
export interface FileData {
  name: string;
  contend: string;
}

export interface File extends PouchDBDocument, FileData {
  type: 'file';
}

export type AllDocs = Project | File;
