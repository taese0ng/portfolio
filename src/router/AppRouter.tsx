import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DesktopHome, Error, MobilePages } from '~/pages';
import { isMobileAtom } from '~/store';
import { useRecoilState } from 'recoil';

const {
  Home,
  Awards,
  Histories,
  MyInfo,
  Settings,
  Certificates,
  Projects,
  ProjectDetail,
  Notion,
  Skills,
} = MobilePages;
const stdWidth = 900;

function AppRouter() {
  const [isMobile, setIsMobile] = useRecoilState(isMobileAtom);

  useEffect(() => {
    const handleResizeWindow = () => {
      if (innerWidth <= stdWidth) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResizeWindow();

    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <BrowserRouter basename="/portfolio">
      <Routes>
        {!isMobile ? (
          <>
            <Route path="/" element={<DesktopHome />} />

            <Route path="*" element={<Error />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/histories" element={<Histories />} />
            <Route path="/myInfo" element={<MyInfo />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/notion" element={<Notion />} />

            <Route path="*" element={<Error />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
