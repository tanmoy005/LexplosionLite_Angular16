import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { TreeNode } from 'src/app/shared/menu-items/menu-items';

@Component({
  selector: 'app-tree-structure',
  standalone: true,
  templateUrl: './tree-structure.component.html',
  styleUrls: ['./tree-structure.component.scss'],
  imports: [
    DemoMaterialModule,
    MatCheckboxModule,
    MatIconModule,
    MatTreeModule,
    NgIf,
    NgFor]
})

export class TreeStructureComponent {
  @Input() rootNode!: TreeNode;
  
  // recursive: boolean = false;
  // levels = new Map<TreeNode, number>();
  // treeControl: NestedTreeControl<TreeNode>;


  // dataSource: MatTreeNestedDataSource<TreeNode>;

  // constructor(private changeDetectorRef: ChangeDetectorRef) {

  //   this.treeControl = new NestedTreeControl<TreeNode>(this.getChildren);
  //   this.dataSource = new MatTreeNestedDataSource();
  //   // this.dataSource.data =this.rootNode;
  // }

  // getChildren = (node: TreeNode) => {
  //   return node.children;
  // };

  // hasChildren = (index: number, node: TreeNode) => {
  //   return node?.children?.length ?? 0 > 0;
  // }
}
