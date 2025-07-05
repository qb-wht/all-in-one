import {Button, Input, Modal} from 'antd';
import {useEditorStore} from '@/entities/editor';
import {createFile, useFileTreeStore} from '@/entities/file';
import {cn} from '@/shared/lib/classNames';
import {useInputState} from '@/shared/lib/hooks';
import type {PropsOf} from '@/shared/types';

export type FileTreeProps = {} & PropsOf<HTMLDivElement>;

export const FileTreeControls = (props: FileTreeProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn('row pl-1', className).build();

  const isOpenCreateFileModal = useFileTreeStore((state) => state.isOpenCreateFileModal);
  const projectId = useEditorStore((state) => state.projectId);

  const changeIsOpenCreateFileModal = useFileTreeStore(
    (state) => state.changeIsOpenCreateFileModal,
  );

  const [path, setPath] = useInputState('');

  return (
    <div className={classNames} {...anotherProps}>
      <Button onClick={() => changeIsOpenCreateFileModal(true)}>Add File</Button>

      <Modal
        title='Create File'
        open={isOpenCreateFileModal}
        onOk={() => {
          createFile({path, projectId: projectId});
          changeIsOpenCreateFileModal(false);
        }}
        onCancel={() => changeIsOpenCreateFileModal(false)}
      >
        <Input value={path} onChange={setPath} title='File Path' />
      </Modal>
    </div>
  );
};
