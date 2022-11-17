import { Modals } from '@components/Desktop';
import { DockItemType } from '@interfaces/dock';

const { Info, Award, Certificate, Skill, History, Project, Settings } = Modals;

const iconUrl = process.env.PUBLIC_URL + '/assets/images/icons';

export const itemIDs = {
  myInfo: 'myInfo',
  awards: 'awards',
  certificates: 'certificates',
  skills: 'skills',
  finder: 'finder',
  settings: 'settings',
  histories: 'histories',
  projects: 'projects',
};

export const itemList: Array<DockItemType> = [
  {
    id: itemIDs.myInfo,
    title: '내 정보',
    isOpen: false,
    icon: `${iconUrl}/myInfo.png`,
    component: Info,
    zIndex: 0,
    nowOpen: false,
  },
  {
    id: itemIDs.awards,
    title: '수상경력',
    isOpen: false,
    icon: `${iconUrl}/award.png`,
    component: Award,
    zIndex: 0,
    width: 800,
    height: 500,
    nowOpen: false,
  },
  {
    id: itemIDs.certificates,
    title: '자격증',
    isOpen: false,
    icon: `${iconUrl}/certificate.png`,
    component: Certificate,
    zIndex: 0,
    width: 600,
    height: 400,
    nowOpen: false,
  },
  {
    id: itemIDs.skills,
    title: '기술스택',
    isOpen: false,
    icon: `${iconUrl}/skill.png`,
    component: Skill,
    zIndex: 0,
    width: 800,
    height: 500,
    nowOpen: false,
  },
  {
    id: itemIDs.histories,
    title: '히스토리',
    isOpen: false,
    icon: `${iconUrl}/history.png`,
    component: History,
    zIndex: 0,
    isAbsoluteHeader: true,
    width: 800,
    height: 500,
    nowOpen: false,
    resizeable: true,
  },
  {
    id: itemIDs.projects,
    title: '프로젝트',
    isOpen: false,
    icon: `${iconUrl}/finder.png`,
    component: Project,
    zIndex: 0,
    isAbsoluteHeader: true,
    width: 800,
    height: 500,
    nowOpen: false,
    resizeable: true,
  },
  // {
  //   id: itemIDs.finder,
  //   title: 'Finder',
  //   isOpen: false,
  //   icon: `${iconUrl}/finder.png`,
  //   component: Finder,
  //   zIndex: 0,
  //   isAbsoluteHeader: true,
  //   width: 800,
  //   height: 500,
  //   nowOpen: false,
  // },
  {
    id: itemIDs.settings,
    title: '환경설정',
    isOpen: false,
    icon: `${iconUrl}/settings.png`,
    component: Settings,
    zIndex: 0,
    nowOpen: false,
  },
];