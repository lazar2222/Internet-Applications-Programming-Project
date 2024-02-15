import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  constructor(private servis:IdentityService) { }

  user=null

  async ngOnInit()
    {
      await this.servis.profile()
      this.user = JSON.parse(JSON.stringify(this.servis.user))
      if(this.servis.header)
      {
        this.servis.header.ngOnInit()
      }
    }

}
