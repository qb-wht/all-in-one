import {type File} from '@/shared/api';
import type {CreateFileDataPublic} from '@/shared/api';
import {fileService} from '@/shared/api';

export const createFile = async (data: CreateFileDataPublic) => {
  return fileService.create(data);
};

export const updateFile = async (file: File) => {
  return fileService.update(file);
};

export const getFile = async (id: string): Promise<File> => {
  return fileService.get(id);
};

export const removeFile = async (file: File) => {
  return fileService.remove(file);
};

export const getFiles = async (projectId: string): Promise<File[]> => {
  return await fileService.getAll(projectId);
};
