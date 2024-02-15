import { Component, OnInit } from '@angular/core';
import { dateToString } from '../helper/bodyhelper';
import { IdentityService } from '../services/identity.service';
import { OrganizerService } from '../services/organizer.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-allworkshops',
  templateUrl: './allworkshops.component.html',
  styleUrls: ['./allworkshops.component.css']
})
export class AllworkshopsComponent implements OnInit {

  constructor(private servis:OrganizerService,public id:IdentityService) { }

  workshops
  currentworkshop=null

  async ngOnInit() {
    this.workshops = await this.servis.getAll()
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
  save(workshop)
  {
    let w = this.deep(workshop)
    delete w._id
    delete w.__v
    delete w.organizer
    delete w.status
    var blob = new Blob([JSON.stringify(w)], {type: "application/json;charset=utf-8"});
    saveAs(blob, w.title+".json");
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
}
