import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public usuarios:any = [];

  constructor(private usuarioService:UsuarioService, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usuarioService.getAll()
    .subscribe(
      (response:any) => {
        if(response.estado=='ok'){
          this.usuarios = response.data;
        }else{
          this.toastr.error(response.data, 'Error');
        }
      }
    )
  }

  delete(id:any){
    if(confirm('Esta seguro que desea eliminar el registro?')){
      this.usuarioService.delete(id)
      .subscribe(
        (response: any) => {
          if(response.estado=='ok'){
            window.location.reload();
          }else{
            this.toastr.error('Usuario no pudo ser eliminado, Intenta de nuevo por favor!', 'Error');
          }
        }, (err)=> console.log(err)
      );
    }
  }

  edit(id:any){
    this.router.navigate(['usuarios','form',id]);
  }

  openForm() {
    this.router.navigate(['usuarios','form', 0]);
  }

  name = 'ExcelSheet.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('data-table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
