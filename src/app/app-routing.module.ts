import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/home-page/home-page.component';
import { LoginPageComponent } from './core/login-page/login-page.component';
import { RegistrPageComponent } from './core/registr-page/registr-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { AuthGuardService } from './shared/services/authguard.service';
const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'home', component: HomePageComponent, canActivate: [AuthGuardService]},
      {path: 'login', component: LoginPageComponent},
      {path: 'registr', component: RegistrPageComponent},
      {path: 'companies-list', loadChildren: () => import('./modules/companies-list/companies-list.module').then(m => m.CompaniesListModule), canActivate: [AuthGuardService] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
