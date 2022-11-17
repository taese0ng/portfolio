import { Skill } from '@interfaces/skill';

const skillUrl = process.env.PUBLIC_URL + '/assets/images/skills';

export const skillList: Array<Skill> = [
  {
    title: 'html',
    src: `${skillUrl}/html.webp`,
  },
  {
    title: 'css',
    src: `${skillUrl}/css.webp`,
  },
  {
    title: 'javascript',
    src: `${skillUrl}/javascript.webp`,
  },
  {
    title: 'typescript',
    src: `${skillUrl}/typescript.webp`,
  },
  {
    title: 'react',
    src: `${skillUrl}/react.webp`,
  },
  {
    title: 'svelte',
    src: `${skillUrl}/svelte.webp`,
  },
];
