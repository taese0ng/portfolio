import { Route, Routes } from 'react-router-dom';

import { DesktopHome } from '~/pages';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DesktopHome />} />

      <Route path="*" element={<DesktopHome />} />
    </Routes>
  );
}

export default AppRouter;
