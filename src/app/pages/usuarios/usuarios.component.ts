import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';

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
      response => {
        this.usuarios = response;
        console.log(response);
      }
    )
  }

  delete(id:any){
    if(confirm('Esta seguro que desea eliminar el registro?')){
      this.usuarioService.delete(id)
      .subscribe(
        (response: any) => {
          if(response=='ok'){
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

}
