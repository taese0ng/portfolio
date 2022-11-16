import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { isMobileAtom } from '~/store';
import { useRecoilValue } from 'recoil';

interface Props {
  onPercent?: boolean;
  blackMode?: boolean;
}

function Battery({ onPercent = false, blackMode = false }: Props) {
  const isMobile = useRecoilValue(isMobileAtom);
  const [isSupport, setIsSupport] = useState(false);
  const [batteryPercent, setBatteryPercent] = useState(0);
  const isSupported = window.navigator && 'getBattery' in window.navigator;

  const updateBatteryPercent = (battery: { level: number }) => {
    setBatteryPercent(battery.level * 100);
  };

  const updateBatteryStatus = () => {
    if (isSupported) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.navigator.getBattery?.().then((battery: any) => {
        updateBatteryPercent(battery);
        battery.onlevelchange = () => {
          updateBatteryPercent(battery);
        };
      });
    }
  };

  useEffect(() => {
    if (isSupported) {
      setIsSupport(true);
      updateBatteryStatus();
    }
  }, []);

  if (!isSupport) {
    return null;
  }

  return (
    <Container>
      {onPercent && (
        <Percentage blackMode={blackMode} isMobile={isMobile}>
          {batteryPercent.toFixed()}%
        </Percentage>
      )}

      <BatteryOuter blackMode={blackMode} isMobile={isMobile}>
        <BatteryInner blackMode={blackMode} batteryPercent={batteryPercent}></BatteryInner>
      </BatteryOuter>
    </Container>
  );
}

export default Battery;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Percentage = styled.div<{ blackMode: boolean; isMobile: boolean }>`
  color: ${({ blackMode }) => (blackMode ? 'var(--black)' : 'var(--white)')};
  font-size: ${({ isMobile }) => (isMobile ? 15 : 13)}px;
  margin-right: 4px;
`;

const BatteryOuter = styled.div<{ blackMode: boolean; isMobile: boolean }>`
  position: relative;
  width: ${({ isMobile }) => (isMobile ? 23 : 20)}px;
  height: ${({ isMobile }) => (isMobile ? 10 : 8)}px;
  border-radius: 4px;
  border: 1px solid ${({ blackMode }) => (blackMode ? 'var(--black)' : 'var(--white)')};
  padding: 1.2px;

  &::before {
    content: '';
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: -4px;
    width: 1.8px;
    height: 4px;
    border-radius: 0 8px 8px 0;
    background-color: ${({ blackMode }) => (blackMode ? 'var(--black)' : 'var(--white)')};
  }
`;

const BatteryInner = styled.div<{ blackMode: boolean; batteryPercent: number }>`
  width: ${({ batteryPercent }) => batteryPercent}%;
  height: 100%;
  border-radius: 2px;
  background-color: ${({ blackMode }) => (blackMode ? 'var(--black)' : 'var(--white)')};
`;
