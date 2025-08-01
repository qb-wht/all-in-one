import {createFileRoute} from '@tanstack/react-router';
import {ProjectPicker} from '@/widgets/projectPicker';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='page'>
      <ProjectPicker />
    </div>
  );
}
