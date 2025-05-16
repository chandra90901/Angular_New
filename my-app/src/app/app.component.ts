import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from './Services/login.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-app';
  parent = 'welcome to Angular';
  isLoggedIn = false;
  constructor(public router: Router,
    private loginServices: LoginService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.loginServices.authStatus$.subscribe(authStatus => {
      this.isLoggedIn = authStatus;
    });
  }

  logout(): void {
    this.loginServices.clearToken();
    this.toastr.show("Logout");
    this.router.navigate(['/login']);
  }
  shouldShowNavbar(): boolean {
    const currentUrl = this.router.url;
    return !(currentUrl.includes('/login') || currentUrl.includes('/signup'));
  }
}
