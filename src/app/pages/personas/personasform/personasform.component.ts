import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from '../../../services/persona.service';
import { SelectsDataService } from '../../../services/selects-data.service';

@Component({
  selector: 'app-personasform',
  templateUrl: './personasform.component.html',
  styleUrls: ['./personasform.component.scss']
})
export class PersonasformComponent implements OnInit {

  id:number = 0;
  form: FormGroup;
  public barrios:any = [];
  public puestos:any = [];
  public roles:any = [];
  public lideres:any = [];
  public existe:any = null;
  
  constructor(private personaService: PersonaService,
              private selectService: SelectsDataService, 
              private readonly fb: FormBuilder,
              private router: Router,
              private rutaActiva: ActivatedRoute,
              private toastr: ToastrService
              ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos:  ['', Validators.required],
      documento:  ['', Validators.required],
      celular:  ['', Validators.required],
      sexo:  ['', Validators.required],
      fecha_nacimiento:  ['', Validators.required],
      barrio_id:  ['', Validators.required],
      puesto_id:  ['', Validators.required],
      rol_id:  ['', Validators.required],
      lider_id:  ['', Validators.required],
    });
    this.llenarSelects();
    this.id=this.rutaActiva.snapshot.params.id;
    if(this.id!=0){
      this.personaService.get(this.id)
      .subscribe((response_edit:any) => {
        if(response_edit.estado=='ok'){
          this.form.patchValue({
            nombres: response_edit.data[0].nombres,
            apellidos:  response_edit.data[0].apellidos,
            documento:  response_edit.data[0].documento,
            celular:  response_edit.data[0].celular,
            sexo:  response_edit.data[0].sexo,
            fecha_nacimiento:  response_edit.data[0].fecha_nacimiento,
            barrio_id:  response_edit.data[0].barrio_id,
            puesto_id:  response_edit.data[0].puesto_id,
            rol_id:  response_edit.data[0].rol_id,
            lider_id:  response_edit.data[0].lider_id
          });
          this.form.controls['documento'].disable();
        }else{
          this.toastr.error('No se pudo obtener información de la Persona, Intenta de nuevo por favor!', 'Error');
        }

      }, (err)=> console.log(err)
      );
    }
  }

  add(){
    //(YYYY/MM/DD)
    console.log(this.form.value.fecha_nacimiento);
    let fecha=this.form.value.fecha_nacimiento;
    let formAux = this.form.getRawValue();
    formAux.fecha_nacimiento = fecha.replaceAll("-","/");
    console.log(formAux);

    if(this.id==0){
      this.personaService.add(formAux)
      .subscribe(
        (response: any) => {
          if(response.data=='ok'){
            this.existe = null;
            this.toastr.success('Persona nueva registrada correctamente', 'Bien hecho!');
            this.router.navigate(['personas']);
          }else{
            if(response.estado=='existe'){
              this.existe = response.data
            }else{
              this.toastr.error('La Persona no pudo ser registrada, Intenta de nuevo por favor!', 'Error');
            }
          }
        }, (err)=> console.log(err)
      );
    }else{
      this.personaService.edit(this.id, formAux)
      .subscribe(
        (response: any) => {
          if(response.data=='ok'){
            this.toastr.success('Información de Persona editada correctamente', 'Bien hecho!');
            this.router.navigate(['personas']);
          }else{
            this.toastr.error('Información de Persona no pudo ser editada, Intenta de nuevo por favor!', 'Error');
          }
        }, (err)=> console.log(err)
      );
    }
    
  }

  back() {
    this.router.navigate(['personas']);
  }

  llenarSelects(){
    this.personaService.getAll()
    .subscribe(
      (responsep: any) => {
        if(responsep.estado=='ok'){
          this.lideres = this.selectService.formatSelect('persona',responsep.data);
        }else{
          this.toastr.error('No se pudo obtener el listado de Personas. Intenta Nuevamente', 'Error');
        }
      }, (err)=> console.log(err)
    );

    this.selectService.barrios()
    .subscribe(
      (responseb: any) => {
        if(responseb.estado=='ok'){
          this.barrios = this.selectService.formatSelect('barrio',responseb.data);
        }else{
          this.toastr.error('No se pudo obtener el listado de Barrios. Intenta Nuevamente', 'Error');
        }
      }, (err)=> console.log(err)
    );

    this.selectService.puestos()
    .subscribe(
      (responsepv: any) => {
        if(responsepv.estado=='ok'){
          this.puestos = this.selectService.formatSelect('puesto_votacion',responsepv.data);
        }else{
          this.toastr.error('No se pudo obtener el listado de Puestos de Votacion. Intenta Nuevamente', 'Error');
        }
      }, (err)=> console.log(err)
    );

    this.selectService.roles()
    .subscribe(
      (responser: any) => {
        if(responser.estado=='ok'){
          this.roles = this.selectService.formatSelect('rol',responser.data);
        }else{
          this.toastr.error('No se pudo obtener el listado de Roles. Intenta Nuevamente', 'Error');
        }
      }, (err)=> console.log(err)
    );
  }

}
