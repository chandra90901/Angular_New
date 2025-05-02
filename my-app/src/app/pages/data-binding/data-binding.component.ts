import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeViewComponent } from '../tree-view/tree-view.component';
@Component({
  selector: 'app-data-binding',
  imports: [FormsModule, TreeViewComponent,],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.css'
})
export class DataBindingComponent {


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
