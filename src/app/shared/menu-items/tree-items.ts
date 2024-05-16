
export interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

export const treeDataitem :TreeNode = {
  id: 1,
  label: 'Root Node',
  children: []
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
