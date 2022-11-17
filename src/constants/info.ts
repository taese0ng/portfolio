import { Content } from '@interfaces/info';

const iconUrl = process.env.PUBLIC_URL + '/assets/images/icons';

export const profileImg = `${iconUrl}/profileImg.webp`;
export const contents: Content[] = [
  {
    id: 'calendar',
    text: '1996',
    icon: `${iconUrl}/calendar.webp`,
  },
  {
    id: 'github',
    text: 'github',
    icon: `${iconUrl}/github.webp`,
    link: 'https://github.com/taese0ng',
  },
  {
    id: 'email',
    text: 'email',
    icon: `${iconUrl}/email.webp`,
    link: 'mailto:taese0ng@naver.com',
  },
  {
    id: 'velog',
    text: 'velog',
    icon: `${iconUrl}/velog.webp`,
    link: 'https://velog.io/@taese0ng',
  },
  {
    id: 'instagram',
    text: 'instagram',
    icon: `${iconUrl}/instagram.webp`,
    link: 'https://www.instagram.com/taese0_0ng/',
  },
];
