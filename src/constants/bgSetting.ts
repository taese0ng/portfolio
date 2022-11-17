import { BgImg } from '@interfaces/bgSetting';

const bgUrl = process.env.PUBLIC_URL + '/assets/images/backgrounds';

export const bgImgs: Array<BgImg> = [
  {
    src: `${bgUrl}/background_redChroma.webp`,
    title: 'RedChroma',
  },
  {
    src: `${bgUrl}/background_monterey.webp`,
    title: 'Monterey(Graphic)',
  },
  {
    src: `${bgUrl}/background_bigsur.webp`,
    title: 'Bigsur(Graphic)',
  },
  {
    src: `${bgUrl}/background_mojave.webp`,
    title: 'Mojave',
  },
  {
    src: `${bgUrl}/background_catalina.webp`,
    title: 'Catalina',
  },
  {
    src: `${bgUrl}/background_highSierra.webp`,
    title: 'HeighSierra',
  },
  {
    src: `${bgUrl}/background_sierra.webp`,
    title: 'Sierra',
  },
  {
    src: `${bgUrl}/background_yosemite.webp`,
    title: 'Yosemite',
  },
  {
    src: `${bgUrl}/background_lion.webp`,
    title: 'Lion',
  },
  {
    src: `${bgUrl}/background_leopard.webp`,
    title: 'Leopard',
  },
];

export const mobileImgs: Array<BgImg> = [
  {
    src: `${bgUrl}/background_ios16.webp`,
    title: 'ios16',
  },
  {
    src: `${bgUrl}/background_ios15.webp`,
    title: 'ios15',
  },
  {
    src: `${bgUrl}/background_ios14.webp`,
    title: 'ios14',
  },
  {
    src: `${bgUrl}/background_ios13.webp`,
    title: 'ios13',
  },
  {
    src: `${bgUrl}/background_ios12.webp`,
    title: 'ios12',
  },
];
