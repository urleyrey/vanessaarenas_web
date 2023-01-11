import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from '../../services/persona.service';
import { SelectsDataService } from '../../services/selects-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.scss']
})
export class PuestosComponent implements OnInit {

  public puestos:any = [];

  constructor(private personaService:PersonaService, 
    private selectService:SelectsDataService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.selectService.puestos()
    .subscribe(
      (response:any) => {
        if(response.estado=='ok'){
          this.puestos = response.data;
        }else{
          this.toastr.error(response.data, 'Error');
        }
      }
    )
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.puestos);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSX.writeFile(book, "Listado Todos Los Puestos.xlsx");
  }

  votantesList(id): void {
    this.personaService.getByPuesto(id)
    .subscribe(
      (response:any) => {
        console.log(response.data);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(response.data);
        const book: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
        XLSX.writeFile(book, "Listado Votantes Puesto "+id+".xlsx");
      }
    )
  }

}
