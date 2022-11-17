import { Certificate } from '@interfaces/certificates';

const certificateUrl = process.env.PUBLIC_URL + '/assets/images/certificates';

export const certificateList: Array<Certificate> = [
  {
    id: 'OPIC Japanese',
    title: 'OPIC Japanese',
    src: `${certificateUrl}/OPIC_Japanese.png`,
    class: 'IH',
  },
];
