import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MaterialModule } from 'src/app/material-module';
import { TreeNode } from 'src/app/shared/menu-items/tree-items';

@Component({
  selector: 'app-tree-structure',
  templateUrl: './tree-structure.component.html',
  styleUrls: ['./tree-structure.component.scss'],
  // standalone: true,
  // imports: [
  //   MaterialModule,
  //   MatCheckboxModule,
  //   MatIconModule,
  //   MatTreeModule,
  //   NgIf,
  //   NgFor]
})

export class TreeStructureComponent {
  @Input() rootNode!: TreeNode;
}
