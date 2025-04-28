import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tree-view',
  imports: [CommonModule],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.css'
})
export class TreeViewComponent {
  @Input() nodes: any[] = [];
  @Input() childData: string = '';

  @Output() dataSent = new EventEmitter<string>();

  sendData() {
    const data = 'Hello from Child';
    this.dataSent.emit(data);
  }
  constructor() { }
}
