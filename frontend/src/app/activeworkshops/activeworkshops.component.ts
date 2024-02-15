import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dateToString } from '../helper/bodyhelper';
import { PublicService } from '../services/public.service';
import { WorkshopsharingserviceService } from '../services/workshopsharingservice.service';

@Component({
  selector: 'app-activeworkshops',
  templateUrl: './activeworkshops.component.html',
  styleUrls: ['./activeworkshops.component.css']
})
export class ActiveworkshopsComponent implements OnInit {

  constructor(private servis:PublicService,private wss:WorkshopsharingserviceService,private router:Router) { }

  async ngOnInit() {
    this.workshops= await this.servis.workshop()
    this.ghostshops=this.workshops
    this.sortlist()
  }

  ghostshops
  workshops
  criteria="0"
  text
  sort="0"

  dts(date)
  {
    return dateToString(date)
  }

  changeText(text)
  {
    this.text=text.value
    this.changeFilter()
  }

  changeFilter()
  {
    if(this.text)
    {
      this.workshops = this.ghostshops.filter(this.mfilter(this.text,this.criteria));
    }
    else
    {
      this.workshops=this.ghostshops
    }
    this.sortlist()
  }

  mfilter(text:string,criteria)
  {
    text = text.toLowerCase()
    let parts = text.split(' ').filter(element => element)
    return (q)=>
    {
      let found = false
      for(let p of parts)
      {
        let q1=q.title.toLowerCase()
        let q2=q.location.toLowerCase()
        if(criteria=="0"||criteria=="2")
        {
          found= found || q1.includes(p)
        }
        if(criteria=="1"||criteria=="2")
        {
          found= found || q2.includes(p)
        }
      }
      return found
    }
  }

  sortlist()
  {
    this.workshops.sort(this.msort(this.sort))
  }

  msort(sort)
  {
    return (x,y)=>
    {
      if(sort=="0")
      {
        return x.title.localeCompare(y.title)
      }
      else
      {
        let d1 = new Date(x.date)
        let d2 = new Date(y.date)
        return d1>d2?1:-1
      }
    }
  }

  async details(workshop)
  {
    await this.wss.details(workshop)
    this.router.navigate(['/workshop/details'])
  }
}
