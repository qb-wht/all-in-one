import {ProjectPicker} from '@/widgets/projectPicker';
import {createFileRoute} from '@tanstack/react-router';

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
