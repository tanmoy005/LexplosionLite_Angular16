// import { Component, Input,ViewEncapsulation } from '@angular/core';
// import { TreeNode } from 'src/app/shared/menu-items/tree-items';

// @Component({
//   selector: 'app-tree-structure',
//   templateUrl: './tree-structure.component.html',
//   styleUrls: ['./tree-structure.component.scss'],
//  // encapsulation: ViewEncapsulation.None 

// })

// export class TreeStructureComponent {
//   @Input() rootNode!: TreeNode;

  
// }

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
  activeLevel:number = 2; 

  ngOnInit() {
    //console.log('the company structure',this.rootNode);
  }
}

