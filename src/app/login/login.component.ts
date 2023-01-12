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
    this.loginService.login(this.form.getRawValue())
    .subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.estado);
        if(response.estado=='ok'){
          if(response.data.length > 0){
            if(response.data[0].estado=='1'){
              localStorage.setItem('userData', JSON.stringify(response.data[0]));
              this.toastr.success(response.data.nombre, 'Bienvenido');
              this.router.navigate(['']);
            }else{
              this.toastr.error('Usuario INACTIVO, no puedes iniciar sesion!', 'Error');
            }
          }else{
            this.toastr.error('Usuario o contraseña incorrecto, verifica por favor!', 'Error');
          }
        }else{
          this.toastr.error('Usuario o contraseña incorrecto, verifica por favor!', 'Error');
        }
      }, (err)=> console.log(err)
    );
  }

}
