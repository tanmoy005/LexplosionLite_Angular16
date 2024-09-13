import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'src/app/shared/menu-items/tree-items';

@Component({
  selector: 'app-tree-structure',
  templateUrl: './tree-structure.component.html',
  styleUrls: ['./tree-structure.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TreeStructureComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChildren('tree') scrollableElements!: QueryList<ElementRef>;
  @Input() rootNode!: TreeNode;
  @Input() activeLevel: number;

  ngOnInit() {
  }

  showBox1 = true;
  showBox2 = true;
  addScrollListeners(): void {;
    
    this.scrollableElements.forEach((element, index) => {
      // console.log('Element with', element);

      element.nativeElement.addEventListener('scroll', () => {
        console.log(`Element with .ng-star-inserted class at index ${index} is scrolling.`);
      });
    });
  }
  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit');

    this.addScrollListeners();

  }



  toggleBoxes(): void {
    this.showBox1 = !this.showBox1;
    this.showBox2 = !this.showBox2;

    // Since the view changes, wait for the DOM update before re-attaching scroll listeners
    setTimeout(() => this.addScrollListeners(), 0);
  }

  handleScroll(boxName: string): void {
    console.log(`${boxName} is being scrolled`);
  }

}

