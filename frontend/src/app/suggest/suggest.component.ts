import { Component, OnInit } from '@angular/core';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {

  constructor(private servis: WorkshopService) { }

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
  tpic

  msg={msg:"",errmsg:""}

  ngOnInit(): void {
  }

  titlepicture(target)
  {
    this.picture = target.files.item(0);
    this.tpic=""
  }

  gallerypicture(target)
  {
    this.temppic = target.files.item(0);
    this.temptar = target
  }

  file(target)
  {
    let template = target.files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let obj = JSON.parse(fileReader.result.toString());
      this.title=obj.title
      this.tpic=obj.titlePicture
      this.date=this.anothernormalDate(obj.date)
      this.location=obj.location
      this.shortDesc=obj.shortDesc
      this.longDesc=obj.longDesc
      this.spaces=obj.totalSpaces
      this.gallery=obj.gallery
      this.galsize=this.gallery.length
    }
    fileReader.readAsText(template);
  }

  anothernormalDate(date)
  {
    let d= new Date(date)
    return String(d.getFullYear()).padStart(4, '0')+"-"+String(d.getMonth()+1).padStart(2, '0')+"-"+String(d.getDate()).padStart(2, '0')+"T"+String(d.getHours()).padStart(2, '0')+":"+String(d.getMinutes()).padStart(2, '0')
  }

  suggest()
  {
    if(this.picture || this.tpic)
    {
      var workshop=
      {
        title:this.title,
        titlePicture:this.tpic,
        date:this.date,
        location:this.location,
        shortDesc:this.shortDesc,
        longDesc:this.longDesc,
        gallery:this.gallery,
        totalSpaces:this.spaces
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

  load()
  {
    document.getElementById('loadFileInput').click()
  }
}

