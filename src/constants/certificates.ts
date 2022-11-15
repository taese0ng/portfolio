import { Certificate } from '@interfaces/certificates';

const certificateUrl = process.env.PUBLIC_URL + 'assets/images/certificates';
const thumbUrl = process.env.PUBLIC_URL + 'assets/images/thumbnails/certificates';

export const certificateList: Array<Certificate> = [
  {
    id: 'OPIC Japanese',
    title: 'OPIC Japanese',
    src: `${certificateUrl}/OPIC_Japanese.png`,
    thumb: `${thumbUrl}/thumb_OPIC_Japanese.webp`,
    class: 'IH',
  },
];
