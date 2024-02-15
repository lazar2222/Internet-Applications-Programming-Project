import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private servis:IdentityService) { }

    async ngOnInit()
    {
      await this.servis.profile()
      this.user = JSON.parse(JSON.stringify(this.servis.user))
      if(this.servis.header)
      {
        this.servis.header.ngOnInit()
      }
    }

  user=null

}
