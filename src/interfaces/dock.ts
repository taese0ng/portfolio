import { ReactElement } from 'react';

export interface DockItemType {
  id: string;
  title: string;
  isOpen: boolean;
  icon: string;
  component: () => ReactElement;
  zIndex: number;
  width?: number;
  height?: number;
  isAbsoluteHeader?: boolean;
  nowOpen: boolean;
  resizeable?: boolean;
  position?: { x: number; y: number };
  isFixed?: boolean;
  isFull?: boolean;
}
