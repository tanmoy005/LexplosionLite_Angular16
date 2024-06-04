import { Component, Input } from '@angular/core';
import { TreeNode } from 'src/app/shared/menu-items/tree-items';

@Component({
  selector: 'app-tree-structure',
  templateUrl: './tree-structure.component.html',
  styleUrls: ['./tree-structure.component.scss'],

})

export class TreeStructureComponent {
  @Input() rootNode!: TreeNode;
}
