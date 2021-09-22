import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { PaginationParams } from '../../Interfaces/PaginationParams';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() config: PaginationParams;
  @Output() emitChangeIndex = new EventEmitter<number>();
  listButton: Array<number> = [];
  constructor() { }

  ngOnInit() {
    for(let i=1; i<=this.config.totalPages; i++){
      this.listButton.push(i);
    }
  }

  changeIndex(index: number){
    this.emitChangeIndex.emit(index);
  }

}
