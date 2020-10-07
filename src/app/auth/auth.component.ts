import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  authForm: FormGroup;

  
  switchMode(){
    this.loginMode = !this.loginMode;
  }
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.authFormInit();
  }
  
  authFormInit(){
    this.authForm = new FormGroup({
      'email' : new FormControl('',[Validators.required, Validators.email]),
      'password' : new FormControl('',[Validators.required])
    })
  }
  
  onSubmit(){
    let authObv: Observable<AuthResponseData>;
    this.isLoading = true;
    if(this.loginMode){
      authObv = this.authService.login(this.authForm.value.email, this.authForm.value.password);
    } else {
      authObv = this.authService.signUp(this.authForm.value.email, this.authForm.value.password);
    }
    authObv.subscribe(
      response=>{
        this.isLoading = false;
        console.log(response); 
        this.router.navigate(['./recipes']);
        console.log('gjhghjgjh');
          
      },
      errorMessage=>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
        
      }
    );
    this.error = null;
  }

}
