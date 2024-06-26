import { Injectable } from '@angular/core';
export interface Menu {
  path: string;
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  submenu: Menu[];
}

const MENUITEMS = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'av_timer',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '',
    title: 'Component',
    icon: 'crop_7_5',
    class: '',
    extralink: false,
    submenu: [
      {
        path: '/component/button',
        title: 'Button',
        icon: 'bi bi-patch-check',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'component/grid',
        title: 'Grid List',
        icon: 'view_comfy',
        class: '',
        extralink: false,
        submenu: [],
      },
    ],
  },

  {
    path: 'component/lists',
    title: 'Lists',
    icon: 'view_list',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/menu',
    title: 'Menu',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/tabs',
    title: 'tabs',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/stepper',
    title: 'stepper',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/expansion',
    title: 'expansion',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/chips',
    title: 'chips',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/toolbar',
    title: 'toolbar',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/progress-snipper',
    title: 'progress snipper',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/progress',
    title: 'progress',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/dialog',
    title: 'dialog',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/tooltip',
    title: 'tooltip',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/dialog',
    title: 'dialog',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/snackbar',
    title: 'snackbar',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/slider',
    title: 'slider',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: 'component/slide-toggle',
    title: 'slide-toggle',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: [],
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
