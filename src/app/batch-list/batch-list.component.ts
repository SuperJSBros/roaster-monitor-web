import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBatch } from 'src/types/interfaces';
import { LabelFormatter } from '../utils/label-formatter';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.scss'],
})
export class BatchListComponent {
  @Input() public batches: IBatch[] = [];
  @Input() public disabled:boolean = false;
  @Output() public selectedItemsEvent = new EventEmitter<IBatch>();
  public filterBy: string = '';
  public selectedItem?: IBatch;
  public labelFormatter =LabelFormatter;

  constructor() {}

  public get filteredItems(): IBatch[] {
    if (this.filterBy.trim() === '') {
      return [...this.batches];
    } else {
      return this.batches.filter((item) =>
        this.labelFormatter.formatBatchLabel(item).toLowerCase().includes(this.filterBy.toLowerCase())
      );
    }
  }

  public selectItem(item: any): void {
    if (this.disabled) {
      return;
    }

    if(this.selectedItem?.id == item.id)
      this.selectedItem = undefined;
    else      
        this.selectedItem = item

    this.selectedItemsEvent.emit(this.selectedItem)
  }

  public isSelected(item: any): boolean {
    return this.selectedItem?.id === item?.id;
  }
}
