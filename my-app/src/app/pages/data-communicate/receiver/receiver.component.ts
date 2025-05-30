import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenderServices } from '../../../Services/sender.service';


@Component({
  selector: 'app-receiver',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {
  message: string = '';
  constructor(private sender: SenderServices) { }
  ngOnInit() {
    this.sender.currentMessage.subscribe(msg => {
      this.message = msg;
    });
  }
}
