import { Component, OnInit } from '@angular/core';
import { dateToString } from '../helper/bodyhelper';
import { OrganizerService } from '../services/organizer.service';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-orgchat',
  templateUrl: './orgchat.component.html',
  styleUrls: ['./orgchat.component.css']
})
export class OrgchatComponent implements OnInit {

  constructor(private servis:OrganizerService,private id:IdentityService) { }

  workshop
  currentworkshop=null

  async ngOnInit(){
    this.workshop = await this.servis.getworkshops()
    if(this.currentworkshop)
    {
      this.threads =await this.servis.threads(this.currentworkshop._id)
      this.updateopen()
    }
  }

  threads=[]
  openthreads=[]

  dts(date)
  {
    return dateToString(date)
  }

  open(workshop)
  {
    this.currentworkshop=workshop
    this.threads=[]
    this.openthreads=[]
    this.ngOnInit()
  }
  close()
  {
    this.currentworkshop=null
    this.threads=[]
    this.openthreads=[]
    this.ngOnInit()
  }

  updateopen()
  {
    for(var i =0 ; i<this.openthreads.length;i++)
    {
      for(let th of this.threads)
      {
        if(this.openthreads[i].user==th.user)
        {
          this.openthreads[i]=th
        }
      }
    }
  }

}
