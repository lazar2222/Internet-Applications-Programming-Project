import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { P401Component } from './p401/p401.component';
import { AdminComponent } from './admin/admin.component';
import { BeginrecComponent } from './beginrec/beginrec.component';
import { EndrecComponent } from './endrec/endrec.component';
import { SucrecComponent } from './sucrec/sucrec.component';
import { SucregComponent } from './sucreg/sucreg.component';
import { SuggestComponent } from './suggest/suggest.component';
import { SugsucComponent } from './sugsuc/sugsuc.component';
import { AdminuserComponent } from './adminuser/adminuser.component';
import { AdminworkshopComponent } from './adminworkshop/adminworkshop.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { AdminsuggestComponent } from './adminsuggest/adminsuggest.component';
import { WorkshopdetailsComponent } from './workshopdetails/workshopdetails.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { PastworkshopsComponent } from './pastworkshops/pastworkshops.component';
import { LikescommentsComponent } from './likescomments/likescomments.component';
import { ChatComponent } from './chat/chat.component';
import { ThreadsComponent } from './threads/threads.component';
import { ThreadComponent } from './thread/thread.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { CurrentworkshopsComponent } from './currentworkshops/currentworkshops.component';
import { ActiveworkshopsComponent } from './activeworkshops/activeworkshops.component';
import { WorkshoppageComponent } from './workshoppage/workshoppage.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CommentbarComponent } from './commentbar/commentbar.component';
import { OrgchatComponent } from './orgchat/orgchat.component';
import { AllworkshopsComponent } from './allworkshops/allworkshops.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainpageComponent,
    LoginComponent,
    RegisterComponent,
    P401Component,
    AdminComponent,
    BeginrecComponent,
    EndrecComponent,
    SucrecComponent,
    SucregComponent,
    SuggestComponent,
    SugsucComponent,
    AdminuserComponent,
    AdminworkshopComponent,
    UserdetailsComponent,
    AdminregisterComponent,
    AdminsuggestComponent,
    WorkshopdetailsComponent,
    ProfileComponent,
    ChangepassComponent,
    PastworkshopsComponent,
    LikescommentsComponent,
    ChatComponent,
    ThreadsComponent,
    ThreadComponent,
    WorkshopsComponent,
    CurrentworkshopsComponent,
    ActiveworkshopsComponent,
    WorkshoppageComponent,
    CommentbarComponent,
    OrgchatComponent,
    AllworkshopsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
