import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SenderServices } from '../../../Services/sender.service';


@Component({
  selector: 'app-sender',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {
  constructor(private sender: SenderServices,
    private router: Router) { }
  ngOnInit(): void {
  }
  send() {
    this.sender.sendMessage('Hello sender');
    this.router.navigate(['/receiver']);
  }
}
