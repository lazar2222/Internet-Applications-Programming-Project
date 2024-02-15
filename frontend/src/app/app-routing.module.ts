import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { AdminsuggestComponent } from './adminsuggest/adminsuggest.component';
import { AdminuserComponent } from './adminuser/adminuser.component';
import { AdminworkshopComponent } from './adminworkshop/adminworkshop.component';
import { BeginrecComponent } from './beginrec/beginrec.component';
import { EndrecComponent } from './endrec/endrec.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { P401Component } from './p401/p401.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SucrecComponent } from './sucrec/sucrec.component';
import { SucregComponent } from './sucreg/sucreg.component';
import { SuggestComponent } from './suggest/suggest.component';
import { SugsucComponent } from './sugsuc/sugsuc.component';
import { WorkshoppageComponent } from './workshoppage/workshoppage.component';
import { WorkshopsComponent } from './workshops/workshops.component';

const routes: Routes = [
  { path: "", component: MainpageComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent },
  { path: "admin/user", component: AdminuserComponent },
  { path: "admin/workshop", component: AdminworkshopComponent },
  { path: "admin/suggest", component: AdminsuggestComponent },
  { path: "admin/register", component: AdminregisterComponent },
  { path: "register", component: RegisterComponent },
  { path: "register/success", component: SucregComponent },
  { path: "401", component: P401Component },
  { path: "forgotten", component: BeginrecComponent },
  { path: "recover", component: EndrecComponent },
  { path: "recover/success", component: SucrecComponent },
  { path: "suggest", component: SuggestComponent },
  { path: "suggest/success", component: SugsucComponent },
  { path: "profile", component: ProfileComponent },
  { path: "workshops", component: WorkshopsComponent },
  { path: "workshop/details", component: WorkshoppageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
