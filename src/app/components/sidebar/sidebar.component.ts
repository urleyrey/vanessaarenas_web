import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/usuarios', title: 'Usuarios',  icon:'users_circle-08', class: '' },
    { path: '/personas', title: 'Personas',  icon:'users_single-02', class: '' },
    // { path: '/coordinador', title: 'Coordinadores',  icon:'business_badge', class: '' },
    // { path: '/lider', title: 'Lideres',  icon:'business_badge', class: '' },
    // { path: '/votante', title: 'Votante',  icon:'business_badge', class: '' },
    // // { path: '/lideres', title: 'Lideres',  icon:'business_badge', class: '' },
    { path: '/puestovotacion', title: 'Puestos de Votacion',  icon:'location_pin', class: '' },
    
    //{ path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

    // { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
  logout(){
    if(confirm("Seguro desea Cerrar Sesión?")){
      this.toastr.success("Sesión finalizada con exito", 'Gracias');
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    }
  }
}
