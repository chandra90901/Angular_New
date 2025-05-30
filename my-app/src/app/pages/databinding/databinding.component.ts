import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-databinding',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './databinding.component.html',
  styleUrl: './databinding.component.css'
})
export class DatabindingComponent {
  username = 'inter polation';
  isWarning = false;
  isDisabled = false;
  btnTitle = 'Click to submit the form';
  Twobinding = '';

  eventBinding(): void {
    alert('event binding');

  }
}
