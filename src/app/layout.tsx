import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

interface Iprops {
  children: ReactElement;
}

export default function Layout({ children }: Iprops) {
  return (
    <div>
      layout
      <Outlet></Outlet>
      {children}
    </div>
  );
}
