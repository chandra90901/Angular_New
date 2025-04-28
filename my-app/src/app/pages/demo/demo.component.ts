import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DemoService } from '../../Services/demo.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HoverHighlightDirective } from '../../hover-highlight.directive';
import { ActivatedRoute } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-demo',
  imports: [ReactiveFormsModule, CommonModule, HoverHighlightDirective],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit, OnDestroy, AfterViewInit {
  selectedId: number | null = null;
  demos: any[] = [];
  myForm: FormGroup;
  subscriptions: Subscription = new Subscription();
  nameLabel = "Enter your Name";
  emailLabel = "Enter your Email";
  ageLabel = "Enter your Age";
  addressLabel = "Enter your Address";
  phoneLabel = "Enter your Phone Number";
  genderLabel = "Enter your Gender";
  modalInstance: any;

  constructor(private fb: FormBuilder, private demoService: DemoService, private route: ActivatedRoute) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required,]]
    });
  }

  @ViewChild('demoModal') demoModalRef!: ElementRef;

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.demoModalRef.nativeElement);
  }

  ngOnInit(): void {
    this.loadDemos();
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.selectedId === null) {
        this.demoService.addDemo(this.myForm.value).subscribe(response => {
          console.log('Saved successfully!', response);
          this.myForm.reset();
          this.loadDemos();
        }, error => {
          console.error('Error saving demo:', error);
        });
      } else {
        this.demoService.updateDemo(this.selectedId, this.myForm.value).subscribe(response => {
          console.log('Updated successfully!', response);
          this.myForm.reset();
          this.loadDemos();
          this.selectedId = null;
        }, error => {
          console.error('Error updating demo:', error);
        });
      }
    }
  }

  loadDemos() {
    const sub = this.demoService.getAllDemos().subscribe((x: any) => {
      this.demos = x;
    });
    this.subscriptions.add(sub);
  }

  deleteDemo(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.demoService.deleteDemo(id).subscribe(response => {
        console.log('Deleted successfully!', response);
        this.loadDemos();
      });
    }
  }

  openAddModal() {
    this.selectedId = null;
    this.myForm.reset();
    this.modalInstance.show();
  }

  editDemo(demo: any) {
    this.selectedId = demo.id;
    this.myForm.patchValue(demo);
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
