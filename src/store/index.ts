import { atom } from 'recoil';

export const bgImgAtom = atom({
  key: 'bgImg',
  default: {
    src: '',
    title: '',
  },
});

export const mobileBgImgAtom = atom({
  key: 'mobileBgImg',
  default: {
    src: '',
    title: '',
  },
});

export const isMobileAtom = atom({
  key: 'isMobile',
  default: false,
});
