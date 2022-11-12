import { Route, Routes } from 'react-router-dom';

import { Home } from '~/pages';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default AppRouter;
