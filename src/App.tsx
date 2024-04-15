import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import routes from './router';
console.log(routes);
function App() {
  return (
    <div className=" flex h-[100vh] w-[100vw] flex-col items-center justify-center">
      <Suspense fallback="">{useRoutes(routes)}</Suspense>
    </div>
  );
}

export default App;
