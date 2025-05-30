import { Component } from '@angular/core';
import { Child2Component } from '../child2/child2.component';

@Component({
  selector: 'app-parent2',
  imports: [Child2Component],
  templateUrl: './parent2.component.html',
  styleUrl: './parent2.component.css'
})
export class Parent2Component {
  childData: string = '';

  receiveData(data: string) {
    this.childData = data;
  }
}
