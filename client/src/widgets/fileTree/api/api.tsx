import {db, type File} from '@/shared/api';
import {getFileName} from '@/shared/lib/files';
import {useFileTreeStore} from '../model';
import {createTree} from '../model/reducers';
import type {CreateFileDataPrivate, CreateFileDataPublic} from '../model/types';

export const getFiles = async () => {
  const res = await db.find({
    selector: {type: 'file'},
  });

  useFileTreeStore.getState().changeTree(createTree(res.docs as File[]));

  return res;
};

export const createFile = async (file: CreateFileDataPublic): Promise<PouchDB.Core.Response> => {
  const fileData: CreateFileDataPrivate = {
    ...file,
    type: 'file',
    name: getFileName(file.path),
  };

  const res = await db.post(fileData as File);

  return res;
};

export const removeFile = async (file: File): Promise<PouchDB.Core.Response> => {
  const res = await db.remove(file);

  return res;
};

export const subscribeOnFilesChanges = () => {
  getFiles();

  const changes = db
    .changes({
      since: 'now',
      live: true,
      include_docs: true,
    })
    .on('change', getFiles);

  return () => changes.cancel();
};
