import {Navbar} from '@/widgets/navbar';
import {createRootRoute, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className='rootPage'>
      <Navbar />

      <Outlet />

      <TanStackRouterDevtools />
    </div>
  ),
});
