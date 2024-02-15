import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../services/adminservice.service';

@Component({
  selector: 'app-adminsuggest',
  templateUrl: './adminsuggest.component.html',
  styleUrls: ['./adminsuggest.component.css']
})
export class AdminsuggestComponent implements OnInit {

  constructor(private servis: AdminserviceService) { }

  title
  picture
  date
  location
  shortDesc
  longDesc
  spaces
  gallery=[]
  galsize=0
  temppic
  temptar
  organizer

  valid

  msg={msg:"",errmsg:""}

  async ngOnInit() {
    this.valid = await this.servis.getvalid()
    this.organizer = this.valid[0]._id
  }

  titlepicture(target)
  {
    this.picture = target.files.item(0);
  }

  gallerypicture(target)
  {
    this.temppic = target.files.item(0);
    this.temptar = target
  }

  suggest()
  {
    if(this.picture)
    {
      var workshop=
      {
        title:this.title,
        titlePicture:this.picture,
        date:this.date,
        location:this.location,
        shortDesc:this.shortDesc,
        longDesc:this.longDesc,
        gallery:this.gallery,
        totalSpaces:this.spaces,
        organizer:this.organizer
      }
      this.servis.suggest(workshop,this.picture,this.msg)
    }
    else
    {
      this.msg.errmsg="Naslovna slika je obavezna."
    }
  }

  async add()
  {
    this.msg.errmsg=""
    if(this.temppic)
    {
      var path = await this.servis.upload(this.temppic,this.msg)
      if(path !== null)
      {
        this.gallery.push(path)
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

  remove(img)
  {
    const index = this.gallery.indexOf(img);
    if (index > -1) { // only splice array when item is found
      this.gallery.splice(index, 1); // 2nd parameter means remove one item only
      this.galsize--
    }
  }

}
