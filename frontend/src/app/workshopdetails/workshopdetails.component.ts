import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../services/adminservice.service';
import { IdentityService } from '../services/identity.service';
import { OrganizerService } from '../services/organizer.service';

@Component({
  selector: 'app-workshopdetails',
  templateUrl: './workshopdetails.component.html',
  styleUrls: ['./workshopdetails.component.css']
})
export class WorkshopdetailsComponent implements OnInit {

  constructor(private as:AdminserviceService,private id:IdentityService,private router:Router,private os:OrganizerService) { }

  @Input() workshop
  @Input() role
  @Input() parent
  msg={msg:"",errmsg:""}
  picture
  date
  galsize
  temppic
  valid
  temptar
  mw
  servis
  pending

  async ngOnChanges(changes) {
    if(changes.workshop)
    {
      if(changes.workshop.firstChange || changes.workshop.previousValue._id!=changes.workshop.currentValue._id)
      {
      this.mw = this.workshop
      this.date = this.anothernormalDate(this.mw.date)
      this.galsize = this.mw.gallery.length
      if(this.role=='organizer')
      {
        this.pending = await this.servis.reservations(this.workshop._id)
      }
      }
    }
  }

  titlepicture(target)
  {
    this.picture = target.files.item(0);
  }

  anothernormalDate(date)
  {
    let d= new Date(date)
    return String(d.getFullYear()).padStart(4, '0')+"-"+String(d.getMonth()+1).padStart(2, '0')+"-"+String(d.getDate()).padStart(2, '0')+"T"+String(d.getHours()).padStart(2, '0')+":"+String(d.getMinutes()).padStart(2, '0')
  }

  async ngOnInit(){
    if(this.role=='admin')
    {
      this.servis = this.as
      this.valid = await this.servis.getvalid()
    }else
    {
      this.servis = this.os
      this.pending = await this.servis.reservations(this.workshop._id)
    }
    
  }

  file(target)
  {
    this.picture = target.files.item(0);
  }

  remove(img)
  {
    const index = this.mw.gallery.indexOf(img);
    if (index > -1) { // only splice array when item is found
      this.mw.gallery.splice(index, 1); // 2nd parameter means remove one item only
      this.galsize--
    }
  }

  gallerypicture(target)
  {
    this.temppic = target.files.item(0);
    this.temptar = target
  }

  async add()
  {
    this.msg.errmsg=""
    if(this.temppic)
    {
      var path = await this.servis.upload(this.temppic,this.msg)
      if(path !== null)
      {
        this.mw.gallery.push(path)
        this.temptar.value=null
        this.temppic=null
        this.galsize++
      }
    }
    else
    {
      this.msg.errmsg="Molimo odaberite sliku."
    }
    
  }

  async suggest()
  {
    this.mw.date = this.date
    await this.servis.suggestp(this.mw,this.picture,this.msg)
    this.parent.ngOnInit()
  }

  async accept(user)
  {
    await this.servis.acceptu(user._id,'participation')
    this.ngOnInit()
  }

  async reject(user)
  {
    await this.servis.acceptu(user._id,'notification')
    this.ngOnInit()
  }

}
