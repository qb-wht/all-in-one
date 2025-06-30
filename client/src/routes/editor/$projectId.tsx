import {createFileRoute} from '@tanstack/react-router';
import {AppSettingsBar} from '@/widgets/appSettingsBar';
import {CodeEditor} from '@/widgets/codeEditor';
import {FileTree} from '@/widgets/fileTree';
import {ViewEditor} from '@/widgets/viewEditor';
import {useAppSettingsStore} from '@/entities/appSettings';

export const Route = createFileRoute('/editor/$projectId')({
  component: RouteComponent,
});

function RouteComponent() {
  const isSource = useAppSettingsStore((state) => state.isSource);

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
