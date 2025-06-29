import {createFileRoute} from '@tanstack/react-router';
import {AppSettingsBar} from '@/widgets/appSettingsBar';
import {CodeEditor} from '@/widgets/codeEditor';
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
      {isSource ? <CodeEditor /> : <ViewEditor />}
    </div>
  );
}
