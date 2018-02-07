import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Estudiante',
    icon: 'nb-person',
    children: [
      {
        title: 'Gestión',
        link: '/pages/estudiante/gestion',
      },
    ],
  },
];
