
export interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

export const treeDataitem :TreeNode = {
  id: 1,
  label: 'Root Node',
  children: [
    {
      id: 2,
      label: 'Child Node 1',
      children: [
        { id: 5, label: 'Grandchild Node 1-1' },
        { id: 6, label: 'Grandchild Node 1-2' }
      ]
    },
    {
      id: 3,
      label: 'Child Node 2'
    },
    {
      id: 4,
      label: 'Child Node 3',
      children: [
        { id: 7, label: 'Grandchild Node 3-1' },
        { id: 8, label: 'Grandchild Node 3-2',}
      ]
    }
  ]
};
// MenuDataItems: TreeNode =this.treeData;
// ngOnInit() {
// this.MenuDataItems= this.treeData;
// // console.log(this.menuItems.getMenuitem);
// }

// @Injectable()
// export class MenuItems {
//   getMenuitem(): Menu[] {
//     return MENUITEMS;
//   }
// }
