import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dateToString } from '../helper/bodyhelper';
import { WorkshopService } from '../services/workshop.service';
import { WorkshopsharingserviceService } from '../services/workshopsharingservice.service';
import * as Leaflet from 'leaflet'; 
import { GcsService } from '../services/gcs.service';
import { IdentityService } from '../services/identity.service';
import { UserserviceService } from '../services/userservice.service';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-workshoppage',
  templateUrl: './workshoppage.component.html',
  styleUrls: ['./workshoppage.component.css']
})
export class WorkshoppageComponent implements OnInit {
  map!: Leaflet.Map;
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: 45.805379, lng: 20.476003}
  }


  constructor(public servis:WorkshopsharingserviceService,public router:Router,public gcs:GcsService,public ws:WorkshopService,public is:IdentityService,public us:UserserviceService) { }

  ngOnInit() {
    this.workshop = this.servis.workshop
    if(!this.workshop)
    {
      this.router.navigate(['/workshops'])
    }
    else
    {
      this.popsub()
      this.fauxThread={messages:[],workshop: this.workshop._id,
      displayUser: "XXX",
      displayOrganizer: "XXX",
      workshopTitle: this.workshop.title,
      userPicture: this.is.user.picture}
    }
  }

  workshop
  seats
  subscriptions
  thread = null
  fauxThread = null
  likelist =[]
  commentlist=[]
  canlike
  myint

  dts(date)
  {
    return dateToString(date)
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event
    this.pin()
  }

  async pin()
  {
    let data:any = await this.gcs.geocode(this.workshop.location)
    let lat =data.lat
    let lon =data.lon
    let marker = Leaflet.marker({ lat: lat, lng: lon}, { draggable: false })
    marker.addTo(this.map)
    this.map.panTo({ lat: lat, lng: lon});
  }

  async popsub()
  {
    this.seats = await this.ws.seats(this.workshop)
    this.subscriptions = await this.ws.subscriptions()
    let threads =await this.us.threads()
    for(let t of threads)
    {
      if(t.workshop==this.workshop._id)
      {
        this.thread=t
      }
    }
    let interactions = await this.ws.interactions(this.workshop)
    this.likelist = interactions.filter(x=> !x.comment)
    this.commentlist = interactions.filter(x=> x.comment)
    this.commentlist.sort(this.nulldatesorter)
    let past = await this.ws.past()
    this.canlike=false
    for(let pws of past)
    {
      if(pws.title==this.workshop.title)
      {
        this.canlike=true
        break
      }
    }
  }

  async reserve()
  {
    await this.ws.postsub(this.workshop,"reservation")
    this.ngOnInit()
  }

  async notif()
  {
    await this.ws.postsub(this.workshop,"notification")
    this.ngOnInit()
  }

  hasSub()
  {
    if(this.subscriptions)
    {
      return this.subscriptions.filter(x=>x.wid==this.workshop._id).length>0
    }
    return false
  }

  descriptiveType()
  {
    let sub = this.subscriptions.filter(x=>x.wid==this.workshop._id)[0]
    if(sub.type=='participation')
    {
      return "Vase prisustvo je vec potvrdjeno od strane organizatora"
    }
    else if(sub.type=='reservation')
    {
      return "Vec ste rezervisali svoje mesto"
    }
    else
    {
      return "Vec ste na listi za notifikaciju"
    }
  }

  startThread()
  {
    this.thread=this.fauxThread
  }

  likes()
  {
    for(let like of this.likelist)
    {
      if(like.user._id == this.is.user._id)
      {
        this.myint=like
        return true;
      }
    }
    this.myint=null
    return false
  }

  async like()
  {
    await this.us.posti(this.workshop.title,null) 
    this.ngOnInit()
  }

  async unlike()
  {
    await this.us.deli(this.myint)
    this.ngOnInit()
  }

  nulldatesorter(x,y)
  {
    if(x.date==null && y.date==null)
    {
      return 0
    }
    if(x.date==null)
    {
      return 1;
    }
    if(y.date==null)
    {
      return -1;
    }
    let d1 = new Date(x.date)
    let d2 = new Date(y.date)
    return d1>d2?-1:1
  }
}
