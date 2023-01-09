import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  
  constructor(private loginService: LoginService, 
              private readonly fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService
              ) {}

  ngOnInit(): void {
      this.form = this.fb.group({
      nombre: ['', Validators.required],
      clave:  ['', Validators.required]
    });
  }

  login(){
    console.log(this.form.getRawValue());
    console.log(this.form.get('nombre').value);
    this.loginService.login(this.form.getRawValue())
    .subscribe(
      (response: any) => {
        console.log(response.length);
        if(response.length>0){
          this.toastr.success(response[0].nombre, 'Bienvenido');
          this.router.navigate(['']);
        }else{
          this.toastr.error('Usuario o contraseña incorrecto, verifica por favor!', 'Error');
        }
      }, (err)=> console.log(err)
    );
  }

}
