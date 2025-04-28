import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeViewComponent } from '../tree-view/tree-view.component';
import { TREE_DATA } from '../../data/tree_data';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
@Component({
  selector: 'app-data-binding',
  imports: [FormsModule, TreeViewComponent],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.css'
})
export class DataBindingComponent {

  username = 'learning Angular';

  isWarning = false;

  isDisabled = false;
  btnTitle = 'Click to submit the form';


  eventBinding() {
    alert("Chandra")
  }

  parentData = "Tree View"

  Twobinding = ''
  sayHello() {
    console.log('Hello,', this.Twobinding);
  }
  receivedData: string = '';

  receiveData(data: string) {
    this.receivedData = data;
  }

  treeData = TREE_DATA;
}
