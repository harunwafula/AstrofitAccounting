import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  registerForm = this.fb.group({
    name : ["", Validators.required],
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


  register() {
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe((data) => {
        this.tokenStorage.saveToken(data.token);
        this.router.navigate(["home"]);
      });
    }
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

}
