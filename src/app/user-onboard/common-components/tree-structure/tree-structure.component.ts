import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'src/app/shared/menu-items/tree-items';

@Component({
  selector: 'app-tree-structure',
  templateUrl: './tree-structure.component.html',
  styleUrls: ['./tree-structure.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TreeStructureComponent implements OnInit {
  @Input() rootNode!: TreeNode;
  @Input() activeLevel : number 

  ngOnInit() {
   
   
  }
}

