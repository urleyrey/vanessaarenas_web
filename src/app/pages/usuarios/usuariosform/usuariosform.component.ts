import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from '../../../services/persona.service';
import { UsuarioService } from '../../../services/usuario.service';
import { SelectsDataService } from '../../../services/selects-data.service';

@Component({
  selector: 'app-usuariosform',
  templateUrl: './usuariosform.component.html',
  styleUrls: ['./usuariosform.component.scss']
})
export class UsuariosformComponent implements OnInit {

  id:number = 0;
  form: FormGroup;
  public personas:any = [];
  
  constructor(private usuarioService: UsuarioService,
              private personaService: PersonaService,
              private selectService: SelectsDataService, 
              private readonly fb: FormBuilder,
              private router: Router,
              private rutaActiva: ActivatedRoute,
              private toastr: ToastrService
              ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      clave:  ['', Validators.required],
      persona_id:  [1, Validators.required],
      estado:  [1, Validators.required],
    });
    this.llenarSelects();
    this.id=this.rutaActiva.snapshot.params.id;
    if(this.id!=0){
      this.usuarioService.get(this.id)
      .subscribe((response_edit:any) => {
        if(response_edit.estado=='ok'){
          this.form.patchValue({
            nombre: response_edit.data[0].nombre,
            clave:  response_edit.data[0].clave,
            persona_id:  response_edit.data[0].persona_id,
            estado:  response_edit.data[0].estado
          });
        }else{
          this.toastr.error('No se pudo obtener información del Usuario, Intenta de nuevo por favor!', 'Error');
        }
        

      }, (err)=> console.log(err)
      );

    }
  }

  add(){
    if(this.id==0){
      this.usuarioService.add(this.form.getRawValue())
      .subscribe(
        (response: any) => {
          if(response.estado=='ok'){
            this.toastr.success('Usuario nuevo registrado correctamente', 'Bien hecho!');
            this.router.navigate(['usuarios']);
          }else{
            this.toastr.error('Usuario no pudo ser registrado, Intenta de nuevo por favor!', 'Error');
          }
        }, (err)=> console.log(err)
      );
    }else{
      this.usuarioService.edit(this.id, this.form.getRawValue())
      .subscribe(
        (response: any) => {
          if(response.estado=='ok'){
            this.toastr.success('Información de Usuario editada correctamente', 'Bien hecho!');
            this.router.navigate(['usuarios']);
          }else{
            this.toastr.error('Información de Usuario no pudo ser editada, Intenta de nuevo por favor!', 'Error');
          }
        }, (err)=> console.log(err)
      );
    }
    
  }

  back() {
    this.router.navigate(['usuarios']);
  }

  llenarSelects(){
    this.personaService.getAll()
    .subscribe(
      (response_p: any) => {
        if(response_p.estado=='ok'){
          this.personas = this.selectService.formatSelect('persona',response_p.data);
        }else{
          this.toastr.error('No se pudo obtener el listado de Personas. Intenta Nuevamente', 'Error');
        }
      }, (err)=> console.log(err)
    );
  }

}
