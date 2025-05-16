import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../Services/login.service';  // Ensure service path is correct
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    debugger;
    if (this.signupForm.valid) {
      this.loginService.addSignup(this.signupForm.value).subscribe(
        x => {
          this.toastr.success('Signup successful!', 'Success');
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error saving demo:', error);
          this.toastr.error('Signup failed. Please try again.', 'Error');;
        }
      );
    } else {
      this.toastr.warning('Please fill in Singup required fields correctly.', 'Warning');
    }
  }
}
