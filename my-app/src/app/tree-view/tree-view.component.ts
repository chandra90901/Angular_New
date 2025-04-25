import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-view',
  imports: [CommonModule],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.css'
})
export class TreeViewComponent {
  @Input() nodes: any[] = [];
}
