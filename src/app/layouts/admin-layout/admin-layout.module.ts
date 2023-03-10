import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';
import { UsuariosformComponent } from '../../pages/usuarios/usuariosform/usuariosform.component';
import { PersonasComponent } from '../../pages/personas/personas.component';
import { PersonasformComponent } from '../../pages/personas/personasform/personasform.component';
import { PuestosComponent } from '../../pages/puestos/puestos.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
})
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UsuariosComponent,
    UsuariosformComponent,
    PersonasComponent,
    PersonasformComponent,
    PuestosComponent,
  ]
})

export class AdminLayoutModule {}
