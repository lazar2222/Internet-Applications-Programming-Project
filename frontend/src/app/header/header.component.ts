import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private servis: IdentityService, private ruter: Router) { }

  items = []
  role
  user

  ngOnInit(): void {
    this.items=[]
    this.getItems()
    this.user=this.servis.user
    this.servis.header = this
  }

  logout()
  {
    this.servis.logout()
  }

  getItems(): any
  {
    this.role = this.servis.role()
    if(this.role == 'participant')
    {
      this.items.push({name:'Profil',link:'profile'})
      this.items.push({name:'Radionice',link:'workshops'})
      this.items.push({name:'Postani organizator',link:'suggest'})
    }
    else if(this.role =='organizer')
    {
      this.items.push({name:'Profil',link:'profile'})
      this.items.push({name:'Radionice',link:'workshops'})
      this.items.push({name:'Dodaj radionicu',link:'suggest'})
    }
    else if(this.role=='admin')
    {
      this.items.push({name:'Korisnici',link:'admin/user'})
      this.items.push({name:'Radionice',link:'admin/workshop'})
      this.items.push({name:'Profil',link:'profile'})
    }
  }

}
