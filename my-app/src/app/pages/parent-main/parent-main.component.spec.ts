import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentMainComponent } from './parent-main.component';

describe('ParentMainComponent', () => {
  let component: ParentMainComponent;
  let fixture: ComponentFixture<ParentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
