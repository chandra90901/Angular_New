import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/users';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/login.service';
import { HoverHighlightDirective } from '../customdirectives/hover-highlight.directive';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule, CommonModule, HoverHighlightDirective],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  signupForm: FormGroup;
  users: User[] = [];
  isEditMode = false;
  editingUserId: number | null = null;
  errorMessage: string = '';
  showFormPopup = false;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loginService.getAllSignups().subscribe({
      next: (data) => this.users = data,
      error: () => this.errorMessage = 'Failed to load users.'
    });
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  openForm(user?: User): void {
    this.showFormPopup = true;
    this.isEditMode = !!user;
    this.editingUserId = user ? user.id : null;

    if (user) {
      this.signupForm.patchValue({ ...user, confirmPassword: user.password });
    } else {
      this.signupForm.reset();
    }
  }

  closeForm(): void {
    this.signupForm.reset();
    this.showFormPopup = false;
    this.isEditMode = false;
    this.editingUserId = null;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fix the errors above.';
      this.toastr.error(this.errorMessage, 'Validation Error');
      this.toastr.warning('Please enter User required fields.', 'Warning');
      return;
    }

    const { username, email, password } = this.signupForm.value;
    const newUser = { username, email, password };

    if (this.isEditMode && this.editingUserId !== null) {
      this.loginService.updateSignup(this.editingUserId, newUser).subscribe({
        next: () => {
          this.loadUsers();
          this.toastr.success('User updated successfully!', 'Success');
          this.closeForm();
        },
        error: err => {
          this.errorMessage = 'Update failed!';
          this.toastr.error(this.errorMessage, 'Error');
        }
      });
    } else {
      this.loginService.addSignup(newUser).subscribe({
        next: () => {
          this.loadUsers();
          this.toastr.success('User added successfully!', 'Success');
          this.closeForm();
        },
        error: err => {
          this.errorMessage = 'Add failed!';
          this.toastr.error(this.errorMessage, 'Error');
        }
      });
    }
  }

  onDelete(id: number): void {
    if (!id) {
      console.error('Invalid ID passed to onDelete:', id);
      return;
    }

    this.loginService.deleteSignup(id).subscribe({
      next: () => {
        this.loadUsers();
        this.toastr.info('User deleted.', 'Deleted');
      },
      error: err => {
        console.error('Error deleting user:', err);
        this.toastr.error('Delete failed.', 'Error');
      }
    });
  }


  onEdit(user: User): void {
    this.openForm(user);
    console.log('Editing user:', user);
  }
}
