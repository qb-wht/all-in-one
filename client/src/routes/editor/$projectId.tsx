import {createFileRoute} from '@tanstack/react-router';
import {useLayoutEffect} from 'react';
import {AppSettingsBar} from '@/widgets/appSettingsBar';
import {CodeEditor} from '@/widgets/codeEditor';
import {FileTree} from '@/widgets/fileTree';
import {ViewEditor} from '@/widgets/viewEditor';
import {useAppSettingsStore} from '@/entities/appSettings';
import {useEditorStore} from '@/entities/editor';

export const Route = createFileRoute('/editor/$projectId')({
  component: RouteComponent,
});

function RouteComponent() {
  const isSource = useAppSettingsStore((state) => state.isSource);
  const changeProjectId = useEditorStore((state) => state.changeProjectId);
  const {projectId} = Route.useParams();

  useLayoutEffect(() => {
    changeProjectId(projectId);
  }, [projectId, changeProjectId]);

  return (
    <div className='page'>
      <AppSettingsBar />

      <div className='row' style={{height: '100%'}}>
        <FileTree />
        {isSource ? <CodeEditor /> : <ViewEditor />}
      </div>
    </div>
  );
}
