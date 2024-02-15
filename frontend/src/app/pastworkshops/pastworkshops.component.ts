import { Component, OnInit } from '@angular/core';
import { dateToString } from '../helper/bodyhelper';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-pastworkshops',
  templateUrl: './pastworkshops.component.html',
  styleUrls: ['./pastworkshops.component.css']
})
export class PastworkshopsComponent implements OnInit {

  constructor(private servis:WorkshopService) { }

  async ngOnInit() {
    this.workshops = await this.servis.past()
  }

  workshops:Array<any>
  dir = 1
  crit = ""

  sort(crit)
  {
    if(crit!=this.crit)
    {
      this.crit = crit
      this.dir = 1
    }
    else
    {
      this.dir*=-1
    }
    if(crit=="name")
    {
      this.workshops.sort((x,y)=>x.title.localeCompare(y.title)*this.dir)
    }
    else if(crit=="date")
    {
      this.workshops.sort((x,y)=>{let d1 = new Date(x.date)
        let d2 = new Date(y.date)
        return (d1>d2?1:-1)*this.dir})
    }
    else if(crit=="location")
    {
      this.workshops.sort((x,y)=>x.location.localeCompare(y.location)*this.dir)
    }
    else 
    {
      this.workshops.sort((x,y)=>x.shortDesc.localeCompare(y.shortDesc)*this.dir)
    }
  }

  dts(date)
  {
    return dateToString(date)
  }
}
