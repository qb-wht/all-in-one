import {createRoot} from 'react-dom/client';
import {RootComponent} from './app/rootComponent';
import '@/shared/styles/index.css';

createRoot(document.getElementById('root')!).render(<RootComponent />);
