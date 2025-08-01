import {createRouter, RouterProvider} from '@tanstack/react-router';
import {createRoot} from 'react-dom/client';
import '@/shared/styles/index.css';
import {routeTree} from './routeTree.gen';

const router = createRouter({routeTree});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
