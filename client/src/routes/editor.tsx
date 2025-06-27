import {useAppSettingsStore} from '@/entities/appSettings/model';
import {CodeEditor} from '@/widgets/codeEditor';
import {ViewEditor} from '@/widgets/viewEditor';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/editor')({
  component: RouteComponent,
});

function RouteComponent() {
  const isSource = useAppSettingsStore((state) => state.isSource);

  return <div className='page'>{isSource ? <CodeEditor /> : <ViewEditor />}</div>;
}
