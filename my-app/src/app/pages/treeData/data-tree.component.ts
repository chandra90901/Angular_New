import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeViewComponent } from '../tree-view/tree-view.component';
@Component({
  selector: 'app-data-tree',
  imports: [FormsModule, TreeViewComponent,],
  templateUrl: './data-tree.component.html',
  styleUrl: './data-tree.component.css'
})
export class DataTreeComponent {


  // parentData = "Tree View"
  treeData = [
    {
      name: 'Root Node 1',
      children: [
        {
          name: 'Child Node 1-1',
          children: [
            { name: 'Grandchild Node 1-1-1' },
            { name: 'Grandchild Node 1-1-2' }
          ]
        },
        { name: 'Child Node 1-2' }
      ]
    },
    {
      name: 'Root Node 2',
      children: [
        { name: 'Child Node 2-1' },
        { name: 'Child Node 2-2' }
      ]
    }
  ];
}
