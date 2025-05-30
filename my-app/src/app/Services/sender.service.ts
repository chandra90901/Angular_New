import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenderServices {

  constructor() { }
  private message = new BehaviorSubject<string>('');
  currentMessage = this.message.asObservable();

  sendMessage(data: string) {
    this.message.next(data);
  }
}
