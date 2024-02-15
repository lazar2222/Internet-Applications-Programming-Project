import { Component, OnInit } from '@angular/core';
import { dateToString } from '../helper/bodyhelper';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-currentworkshops',
  templateUrl: './currentworkshops.component.html',
  styleUrls: ['./currentworkshops.component.css']
})
export class CurrentworkshopsComponent implements OnInit {

  constructor(private servis:WorkshopService) { }

  workshops

  async ngOnInit() {
    this.workshops = await this.servis.subscriptions()
  }

  dts(date)
  {
    return dateToString(date)
  }

  cancelable(subscription)
  {
    if(subscription.type == 'participation')
    {
      let d1 = new Date(subscription.date)
      let ms = d1.getTime() - Date.now()
      return ms > 12*60*60*1000
    }
    return true
  }

  async cancel(subscription)
  {
    await this.servis.delsub(subscription)
    this.ngOnInit()
  }

  descriptiveType(type)
  {
    if(type=='participation')
    {
      return "Prisustvo"
    }
    else if(type=='reservation')
    {
      return "Rezervacija"
    }
    else
    {
      return "Obavestenje"
    }
  }

}
