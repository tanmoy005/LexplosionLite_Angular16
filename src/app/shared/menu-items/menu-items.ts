import { Injectable } from '@angular/core';

export interface Menu {
  // state: string;
  // name: string;
  // type: string;
  // icon: string;
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
    submenu: []
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
      submenu: []
    },
    {
      path: 'component/grid',
      title: 'Grid List',
      icon: 'view_comfy',
      class: '',
      extralink: false,
      submenu: []
    }
  ]
  },
  
  {
    path: 'component/lists',
    title: 'Lists',
    icon: 'view_list',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'component/menu',
    title: 'Menu',
    icon: 'view_headline',
    class: '',
    extralink: false,
    submenu: []
  }
  // { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  // { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  // { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  // { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  // { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  // { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  // { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  // {
  //   state: 'expansion',
  //   type: 'link',
  //   name: 'Expansion Panel',
  //   icon: 'vertical_align_center'
  // },
  // { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  // { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  // {
  //   state: 'progress-snipper',
  //   type: 'link',
  //   name: 'Progress snipper',
  //   icon: 'border_horizontal'
  // },
  // {
  //   state: 'progress',
  //   type: 'link',
  //   name: 'Progress Bar',
  //   icon: 'blur_circular'
  // },
  // {
  //   state: 'dialog',
  //   type: 'link',
  //   name: 'Dialog',
  //   icon: 'assignment_turned_in'
  // },
  // { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  // { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  // { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  // {
  //   state: 'slide-toggle',
  //   type: 'link',
  //   name: 'Slide Toggle',
  //   icon: 'all_inclusive'
  // }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
