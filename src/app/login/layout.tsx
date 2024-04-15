import { Outlet } from 'react-router-dom';

export default function layout({ children }) {
  return (
    <div>
      123{children}
      <Outlet></Outlet>
    </div>
  );
}
