export interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

export const treeDataitem: TreeNode = {
  id: 1,
  label: 'Root Node',
  children: [],
};
