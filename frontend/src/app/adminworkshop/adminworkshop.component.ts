import { Component, OnInit } from '@angular/core';
import { dateToString } from '../helper/bodyhelper';
import { AdminserviceService } from '../services/adminservice.service';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-adminworkshop',
  templateUrl: './adminworkshop.component.html',
  styleUrls: ['./adminworkshop.component.css']
})
export class AdminworkshopComponent implements OnInit {

  constructor(private servis:AdminserviceService,private id:IdentityService) { }

  ghost
  workshops
  pending
  currentworkshop

  valid

  async ngOnInit() {
    this.ghost = await this.servis.getworkshops()
    this.workshops = this.ghost.filter(x => x.status=="active")
    this.pending = this.ghost.filter(x => x.status=="pending")
    this.valid = await this.servis.getvalid()
  }

  dts(date)
  {
    return dateToString(date)
  }


  open(workshop)
  {
    this.currentworkshop=workshop
  }
  close()
  {
    this.currentworkshop=null
  }

  async del(workshop)
  {
    await this.servis.delw(workshop)
    this.ngOnInit()
  }

  deep(user)
  {
    let newuser = JSON.parse(JSON.stringify(user))
    return newuser
  }

  isValid(id)
  {
    for(let user of this.valid)
    {
      if(user._id==id)
      {
        return true
      }
    }
    return false
  }

  async accept(user)
  {
    await this.servis.acceptw(user)
    this.ngOnInit()
  }
  async reject(user)
  {
    await this.servis.rejectw(user)
    this.ngOnInit()
  }  
}
