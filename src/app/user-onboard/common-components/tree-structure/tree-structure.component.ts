import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { TreeNode } from 'src/app/shared/menu-items/tree-items';

@Component({
  selector: 'app-tree-structure',
  templateUrl: './tree-structure.component.html',
  styleUrls: ['./tree-structure.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeStructureComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChildren('tree') scrollableElements!: QueryList<ElementRef>;
  @Input() rootNode!: TreeNode;
  @Input() activeLevel: number;

  ngOnInit() {}

  showBox1 = true;
  showBox2 = true;
  addScrollListeners(): void {
    this.scrollableElements.forEach((element, index) => {
      element.nativeElement.addEventListener('scroll', () => {});
    });
  }
  ngAfterViewInit(): void {
    this.addScrollListeners();
  }

  toggleBoxes(): void {
    this.showBox1 = !this.showBox1;
    this.showBox2 = !this.showBox2;

    setTimeout(() => this.addScrollListeners(), 0);
  }

  handleScroll(boxName: string): void {}
}
