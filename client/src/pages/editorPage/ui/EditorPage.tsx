import {CodeEditor} from '@/widgets/codeEditor';
import {ViewEditor} from '@/widgets/viewEditor';
import {Navbar} from '@/widgets/navbar';
import {useAppSettingsStore} from '@/entities/appSettings/model';
import {ProjectPicker} from '@/widgets/projectPicker';

export const EditorPage = () => {
  const isSource = useAppSettingsStore((state) => state.isSource);

  return (
    <div className='page'>
      <Navbar />

      <ProjectPicker />

      {isSource ? <CodeEditor /> : <ViewEditor />}
    </div>
  );
};
