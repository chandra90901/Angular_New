import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoService } from '../../Services/demo.service';
import { CommonModule } from '@angular/common';
import { HoverHighlightDirective } from '../customdirectives/hover-highlight.directive';
import { catchError, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee',
  imports: [ReactiveFormsModule, CommonModule, HoverHighlightDirective],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employeeForm: FormGroup;
  employeeList: any[] = [];
  isEditMode = false;
  editId: number | null = null;
  subscriptions: Subscription = new Subscription();
  constructor(private fb: FormBuilder,
    private demoService: DemoService,
    private toastr: ToastrService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    const sub = this.demoService.getAllDemos()
      .pipe(
        catchError(error => {
          this.toastr.error('Error fetching employees:', 'error');
          return ([]);
        })
      )
      .subscribe((data: any) => {
        this.employeeList = data;
      });

    this.subscriptions.add(sub);
  }
  // async ngOnInit() {

  // }
  // getEmployees() {
  //   try {
  //     const data = this.demoService.getAllDemosAsPromise();
  //     console.log('Data received (Promise):', data);
  //   } catch (error) {
  //     console.error('Promise error:', error);
  //   }
  // }
  onSubmit() {
    if (this.employeeForm.invalid) {
      this.toastr.warning('Please enter Employee required fields.', 'Warning');
      return;
    }
    if (this.isEditMode && this.editId !== null) {
      this.demoService.updateDemo(this.editId, this.employeeForm.value).subscribe(
        () => {
          this.toastr.success('Employee updated successfully!', 'Success');
          this.getEmployees();
          this.resetForm();
        },
        error => {
          console.error('Update error:', error);
          this.toastr.error('Failed to update employee.', 'Error');
        }
      );
    } else {
      this.demoService.addDemo(this.employeeForm.value).subscribe(
        () => {
          this.toastr.success('Employee added successfully!', 'Success');
          this.getEmployees();
          this.resetForm();
        },
        error => {
          console.error('Add error:', error);
          this.toastr.error('Failed to add employee.', 'Error');
        }
      );
    }
  }


  onEdit(emp: any) {
    this.employeeForm.patchValue(emp);
    this.isEditMode = true;
    this.editId = emp.id;
  }

  onDelete(id: number) {
    this.demoService.deleteDemo(id).subscribe(() => {
      this.toastr.success('Employee delete successfully!', 'Success');
      this.getEmployees();
    });
  }

  resetForm() {
    this.employeeForm.reset();
    this.isEditMode = false;
    this.editId = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
