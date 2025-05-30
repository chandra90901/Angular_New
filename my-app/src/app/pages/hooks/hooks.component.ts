import {
  Component,
  Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterViewInit,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-hooks',
  templateUrl: './hooks.component.html',
  styleUrls: ['./hooks.component.css']
})
export class HooksComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy {

  @Input() myData: string = '';
  message: string = '';

  constructor() {
    console.log('%cConstructor', 'color: blue');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('%cngOnChanges', 'color: orange', changes);
    if (changes['myData']) {
      this.message = `Input changed to: ${changes['myData'].currentValue}`;
    }
  }

  ngOnInit(): void {
    console.log('%cngOnInit', 'color: green');
  }

  ngDoCheck(): void {
    console.log('%cngDoCheck - custom change detection logic', 'color: purple');
  }

  ngAfterViewInit(): void {
    console.log('%cngAfterViewInit - view initialized', 'color: teal');
  }

  ngOnDestroy(): void {
    console.log('%cngOnDestroy - cleaning up', 'color: red');
    alert('HooksComponent destroyed!');
  }
}
