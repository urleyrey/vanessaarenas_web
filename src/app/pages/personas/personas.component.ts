import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  public personas:any = [];

  constructor(private personaService:PersonaService, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.personaService.getAll()
    .subscribe(
      response => {
        this.personas = response;
      }
    )
  }

  delete(id:any){
    if(confirm('Esta seguro que desea eliminar el registro?')){
      this.personaService.delete(id)
      .subscribe(
        (response: any) => {
          if(response=='ok'){
            window.location.reload();
          }else{
            this.toastr.error('Informacion Personal no pudo ser eliminada, Intenta de nuevo por favor!', 'Error');
          }
        }, (err)=> console.log(err)
      );
    }
  }

  edit(id:any){
    this.router.navigate(['personas','form',id]);
  }

  openForm() {
    this.router.navigate(['personas','form', 0]);
  }

}
