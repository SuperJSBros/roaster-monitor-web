import { Component, EventEmitter, Output } from '@angular/core';
import { IBatch } from 'src/types/interfaces';
import { ProbeDailyService } from '../service/probe-daily.service';


@Component({
  selector: 'app-batch-form',
  templateUrl: './batch-form.component.html',
  styleUrls: ['./batch-form.component.scss']
})
export class BatchFormComponent {
  @Output() public newBatchEvent = new EventEmitter<IBatch>(); 
  public isOpen = false;

  public item:Partial<IBatch> = {
    id:undefined,
    name: '',
    weight: 0,
    origin:''
  };
  constructor(private probeDailyService:ProbeDailyService){}

  public openForm() {
    this.isOpen = true;
  }

  public closeForm() {
    this.isOpen = false;
    this.item = { name: '', weight: 0, origin:'' };
  }

  public saveItem() {
    if(this.item.name && this.item.weight && this.item.origin)
    {
      this.probeDailyService.saveBatch(this.item).subscribe(
        (newItem)=>this.newBatchEvent.emit(newItem)
      )
      this.closeForm();  
    }
    
  }



}
