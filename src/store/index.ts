import { atom } from 'recoil';

const bgUrl = process.env.PUBLIC_URL + '/assets/images/backgrounds';

export const bgImgAtom = atom({
  key: 'bgImg',
  default: {
    src: `${bgUrl}/background_monterey.webp`,
    title: 'Monterey(Graphic)',
  },
});

export const mobileBgImgAtom = atom({
  key: 'mobileBgImg',
  default: {
    src: `${bgUrl}/background_ios16.webp`,
    title: 'ios16',
  },
});

export const isMobileAtom = atom({
  key: 'isMobile',
  default: false,
});
