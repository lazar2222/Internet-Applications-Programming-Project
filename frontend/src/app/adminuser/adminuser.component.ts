import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../services/adminservice.service';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {

  constructor(private servis:AdminserviceService,private id:IdentityService) { }

  async ngOnInit() {
    this.ghost = await this.servis.getusers()
    this.users = this.ghost.filter(x => x._id != this.id.user._id && x.status=="active")
    this.pending = this.ghost.filter(x => x._id != this.id.user._id && x.status=="pending")
  }

  ghost
  users
  pending
  currentuser

  displayRole(role)
  {
    if(role=='admin')
    {
      return 'Administrator'
    }
    else if(role=='participant')
    {
      return 'Ucesnik'
    }
    else
    {
      return 'Organizator'
    }
  }

  displayStatus(status)
  {
    if(status=='active')
    {
      return 'Aktivan'
    }
    else if(status=='pending')
    {
      return 'Na cekanju'
    }
    else
    {
      return 'Neaktivan'
    }
  }

  open(user)
  {
    this.currentuser=null
    this.currentuser=user
  }
  close()
  {
    this.currentuser=null
  }
  async accept(user)
  {
    await this.servis.accept(user)
    this.ngOnInit()
  }
  async reject(user)
  {
    await this.servis.reject(user)
    this.ngOnInit()
  }
  async del(user)
  {
    await this.servis.del(user)
    this.ngOnInit()
  }
  deep(user)
  {
    return JSON.parse(JSON.stringify(user))
  }
}
