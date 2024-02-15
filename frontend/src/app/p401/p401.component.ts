import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-p401',
  templateUrl: './p401.component.html',
  styleUrls: ['./p401.component.css']
})
export class P401Component implements OnInit {

  constructor(private servis:IdentityService) { }

  ngOnInit(): void {
    this.servis.profile()
  }

}
