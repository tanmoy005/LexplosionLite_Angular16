import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';


export interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

// const encryptStorage = new EncryptStorage(environment.localStorageKey);
// const { user } = encryptStorage.getItem('login-details');
// const userCompanies = user.companies;
// const userCompanyName = userCompanies.length > 0 ? userCompanies[0]['name'] : '';

export const treeDataitem :TreeNode = {
  id: 1,
  label: 'Root Node',
  //label:  userCompanyName,
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
