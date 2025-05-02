import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-parent-main',
  imports: [FormsModule],
  templateUrl: './parent-main.component.html',
  styleUrls: ['./parent-main.component.css']
})
export class ParentMainComponent {
  @Input() childData: string = '';

  userId = 1;
  message = "Welcome To demo Project";

  username = 'learning Angular';
  isWarning = false;
  isDisabled = false;
  btnTitle = 'Click to submit the form';
  Twobinding = '';

  constructor(private router: Router) { }

  eventBinding(): void {
    alert('Chandra');

  }
  goToMain(): void {
    this.router.navigate(['/main', this.userId, this.message]);
  }
}