import { Skill } from '@interfaces/skill';

const skillUrl = process.env.PUBLIC_URL + 'assets/images/skills';

export const skillList: Array<Skill> = [
  {
    title: 'html',
    src: `${skillUrl}/html.png`,
  },
  {
    title: 'css',
    src: `${skillUrl}/css.png`,
  },
  {
    title: 'javascript',
    src: `${skillUrl}/javascript.png`,
  },
  {
    title: 'typescript',
    src: `${skillUrl}/typescript.png`,
  },
  {
    title: 'react',
    src: `${skillUrl}/react.png`,
  },
  {
    title: 'svelte',
    src: `${skillUrl}/svelte.png`,
  },
];
