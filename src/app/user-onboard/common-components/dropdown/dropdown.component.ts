import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent implements OnInit {
  @Input() label: string;
  @Input() options: { value: any; label: string; icon?: string }[];
  @Input() IsMultiSelection: boolean = false;
  @Input() IsRequired: boolean = false;

  @Input() unchangeableValues: any[] = [];
  @Input() changeableValues: Number | any[] | null = [];
  @Input() type: string = 'default';
  @Input() isDisabled: boolean = false;

  valuesReceived: any[] = [];

  ngOnInit(): void {
    this.combineValues();
    console.log('the unchangable values', this.unchangeableValues);
  }

  combineValues(): void {
    if (Array.isArray(this.changeableValues)) {
      this.changeableValues = [
        ...this.changeableValues,
        ...this.unchangeableValues,
      ];
    }
  }

  @Output() selectedValueChange: EventEmitter<any> = new EventEmitter<any>();

  isDropdownOpened: boolean = false;

  onSelectionChange(event: any) {
    this.selectedValueChange.emit(event.value);
  }
  toggleDropdown() {
    !this.isDropdownOpened;
  }

  isValueDisabled(value: any): boolean {
    return this.unchangeableValues.includes(value);
  }
}
