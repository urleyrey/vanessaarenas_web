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
  public dtOptions: DataTables.Settings = {};
  public usuarios:any = [];
  public showContent=false;

  constructor(private usuarioService:UsuarioService, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.usuarioService.getAll()
    .subscribe(
      (response:any) => {
        if(response.estado=='ok'){
          this.usuarios = response.data;
          setTimeout(()=>this.showContent=true, 1000);
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

  name = 'Listado de Usuarios.xlsx';
  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.usuarios);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSX.writeFile(book, this.name);
  }

}
