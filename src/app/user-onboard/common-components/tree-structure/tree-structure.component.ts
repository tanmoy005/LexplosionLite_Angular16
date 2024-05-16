import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { TreeNode } from 'src/app/shared/menu-items/tree-items';

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
}
