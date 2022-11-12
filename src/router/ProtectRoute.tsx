import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  trigger: boolean;
  redirectPath: string;
  children: ReactNode;
}

function ProtectRoute({ trigger, redirectPath, children }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!trigger) {
      navigate(redirectPath);
    }
  }, [trigger]);

  return <>{children}</>;
}

export default ProtectRoute;
