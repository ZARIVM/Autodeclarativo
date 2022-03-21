import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService, User } from '../session.service';

@Component({
  selector: 'igac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    user: ['',Validators.required],
    password: ['',Validators.required],
  });

  constructor(
    private sessionService: SessionService,       
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  login(){    
    console.warn(this.loginForm.value);
    const newCredentials = {user : this.loginForm.value.user, password: this.loginForm.value.password }    
    this.sessionService.loginObservable(newCredentials).subscribe(
      (user: User) => {
        /* this.presentToast("¡Bienvenido " + user.firstName + "!"); */
        console.log("Credenciales correctas. user:",user)
        this.router.navigate(["/"]);
      },
      () => {
        /* this.presentToast("Hubo un problema al obtener tus datos"); */
        console.warn("Credenciales erroneas")
      },      
    ) 

  }  

  onSubmit() {
    // TODO: Use EventEmitter with form value    
    this.login();
  }


}
