import { Component, Input } from '@angular/core';
import { OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hooks',
  imports: [],
  templateUrl: './hooks.component.html',
  styleUrl: './hooks.component.css'
})
export class HooksComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy {

  @Input() myData: string = '';
  message: string = '';

  constructor() {
    console.log('Constructor called!');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called!', changes);
    this.message = 'ngOnChanges called!';
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
    this.message = 'ngOnInit called!';
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
    alert('HooksComponent is being destroyed!');
  }
}
