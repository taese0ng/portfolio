import { atom } from 'recoil';

const bgUrl = process.env.PUBLIC_URL + 'assets/images/backgrounds';
const thumbUrl = process.env.PUBLIC_URL + 'assets/images/thumbnails/backgrounds';

export const bgImgAtom = atom({
  key: 'bgImg',
  default: {
    src: `${bgUrl}/background_monterey.png`,
    thumb: `${thumbUrl}/thumb_monterey.webp`,
    title: 'Monterey(Graphic)',
  },
});

export const mobileBgImgAtom = atom({
  key: 'mobileBgImg',
  default: {
    src: `${bgUrl}/background_ios16.png`,
    thumb: `${thumbUrl}/thumb_ios16.webp`,
    title: 'ios16',
  },
});

export const isMobileAtom = atom({
  key: 'isMobile',
  default: false,
});
