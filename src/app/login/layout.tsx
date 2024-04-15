import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
interface Iprops {
  children: ReactElement;
}
export default function layout({ children }: Iprops) {
  return (
    <div>
      123{children}
      <Outlet></Outlet>
    </div>
  );
}
