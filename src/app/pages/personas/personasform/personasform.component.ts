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
      .subscribe((response:any) => {
        console.log(response);
        this.form.patchValue({
          nombres: response[0].nombres,
          apellidos:  response[0].apellidos,
          documento:  response[0].documento,
          celular:  response[0].celular,
          sexo:  response[0].sexo,
          fecha_nacimiento:  response[0].fecha_nacimiento,
          barrio_id:  response[0].barrio_id,
          puesto_id:  response[0].puesto_id,
          rol_id:  response[0].rol_id,
          lider_id:  response[0].lider_id
        });
      }, (err)=> console.log(err)
      );
    }
  }

  add(){
    if(this.id==0){
      this.personaService.add(this.form.getRawValue())
      .subscribe(
        (response: any) => {
          if(response=='ok'){
            this.toastr.success('Persona nueva registrada correctamente', 'Bien hecho!');
            this.router.navigate(['personas']);
          }else{
            this.toastr.error('La Persona no pudo ser registrada, Intenta de nuevo por favor!', 'Error');
          }
        }, (err)=> console.log(err)
      );
    }else{
      this.personaService.edit(this.id, this.form.getRawValue())
      .subscribe(
        (response: any) => {
          if(response=='ok'){
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
        this.lideres = this.selectService.formatSelect('persona',responsep);
      }, (err)=> console.log(err)
    );

    this.selectService.barrios()
    .subscribe(
      (responseb: any) => {
        this.barrios = this.selectService.formatSelect('barrio',responseb);
      }, (err)=> console.log(err)
    );

    this.selectService.puestos()
    .subscribe(
      (responsepv: any) => {
        this.puestos = this.selectService.formatSelect('puesto_votacion',responsepv);
      }, (err)=> console.log(err)
    );

    this.selectService.roles()
    .subscribe(
      (responser: any) => {
        this.roles = this.selectService.formatSelect('rol',responser);
      }, (err)=> console.log(err)
    );
  }

}
