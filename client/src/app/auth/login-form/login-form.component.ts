import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email : ["", Validators.required],
    password : ["", Validators.required]
  });

  hidePassword : boolean = false;
  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private router : Router,
    private tokenStorage : TokenStorageService
  ){

  }


  login() {
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.authService.login(this.loginForm.value).subscribe((data : any) => {
        this.tokenStorage.saveToken(data.token);
        this.router.navigate(["home"]);
      });
    }
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }
}
