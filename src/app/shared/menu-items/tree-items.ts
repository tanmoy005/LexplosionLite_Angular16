export interface TreeNode {
  id: number;
  label: string;
  level:number;
  children?: TreeNode[];
}

export const treeDataitem: TreeNode = {
  id: 1,
  label: 'Root Node',
  level:0,
  children: [],
};
