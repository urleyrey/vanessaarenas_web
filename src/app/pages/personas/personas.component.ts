import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from '../../services/persona.service';
import * as XLSX from 'xlsx';
import { LanguageApp } from '../../data/language';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  rol:string = '';
  public personas:any = [];
  public showContent=false;

  constructor(private personaService:PersonaService, 
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu: [10, 25, 50, 100],
      order: [[0,"desc"]],
      language: LanguageApp.spanish_datatables
    };
    console.log(this.rutaActiva.snapshot.url[0].path);
    this.rol=this.rutaActiva.snapshot.url[0].path;
    if(this.rol=='coordinador'){
      this.personaService.getByRol(2)
      .subscribe(
        response => {
          this.personas = response;
        }
      )
    }
    if(this.rol=='lider'){
      this.personaService.getByRol(3)
      .subscribe(
        response => {
          this.personas = response;
        }
      )
    }
    if(this.rol=='votante'){
      this.personaService.getByRol(4)
      .subscribe(
        response => {
          this.personas = response;
        }
      )
    }
    if(this.rol=='personas'){
      this.personaService.getAll()
      .subscribe(
        (response:any) => {
          if(response.estado=='ok'){
            this.personas = response.data;
            setTimeout(()=>this.showContent=true, 1000);
          }else{
            this.toastr.error(response.data, 'Error');
          }
        }
      )
    }
    
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

  name = 'ExcelSheet.xlsx';
  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.personas);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSX.writeFile(book, "Listado Todos Los Votantes.xlsx");
  }

  votantesList(id, documento): void {
    this.personaService.getByLider(id)
    .subscribe(
      (response:any) => {
        console.log(response);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(response.data);
        const book: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
        XLSX.writeFile(book, "Listado Votantes Lider "+documento+".xlsx");
      }
    )
  }
}
