import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private servis:UserserviceService) { }

  async ngOnInit(){
    this.threads =await this.servis.threads()
    this.updateopen()
  }

  threads
  openthreads = []

  updateopen()
  {
    for(var i =0 ; i<this.openthreads.length;i++)
    {
      for(let th of this.threads)
      {
        if(this.openthreads[i].workshop==th.workshop)
        {
          this.openthreads[i]=th
        }
      }
    }
  }

}
