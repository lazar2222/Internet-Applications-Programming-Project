import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  constructor(public servis:IdentityService) { }

  old
  new
  new2

  msg={msg:"",errmsg:""}

  ngOnInit(): void {
  }

  change()
  {
    var data = 
    {
      oldpassword:this.old,
      password:this.new,
      repeatpassword:this.new2
    }
    this.servis.changepass(data,this.msg)
  }

}
