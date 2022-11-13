import {
  Award,
  Certificate,
  History,
  Info,
  Project,
  Settings,
  Skill,
} from '@components/Desktop/Modals';
import { DockItemType } from '@interfaces/dock';

const iconUrl = process.env.PUBLIC_URL + 'assets/images/icons';

export const itemIDs = {
  myInfo: 'myInfo',
  award: 'award',
  certificate: 'certificate',
  skill: 'skill',
  finder: 'finder',
  settings: 'settings',
  history: 'history',
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
    id: itemIDs.award,
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
    id: itemIDs.certificate,
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
    id: itemIDs.skill,
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
    id: itemIDs.history,
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
  // 	id: itemIDs.finder,
  // 	title: "Finder",
  // 	isOpen: false,
  // 	icon: `${iconUrl}/finder.png`,
  // 	component: Finder,
  // 	zIndex: 0,
  // 	isAbsoluteHeader: true,
  // 	width: 800,
  // 	height: 500,
  // 	nowOpen: false,
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
