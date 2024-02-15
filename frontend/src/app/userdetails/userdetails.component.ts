import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../services/adminservice.service';
import { IdentityService } from '../services/identity.service';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(private aservis:AdminserviceService,private uservis:UserserviceService,private id:IdentityService,private router:Router) { }

  @Input() user
  @Input() role
  @Input() parent
  msg={msg:"",errmsg:""}
  myuser
  picture
  servis

  ngOnInit(): void {
    this.myuser = this.user
    if(this.role=='admin')
    {
      this.servis=this.aservis
    }
    else
    {
      this.servis=this.uservis
    }
  }

  ngOnChanges(changes) {
    if(!this.user.address)
    {
      this.user.address={country:null, city:null, zip:null,street:null,number:null}
    }
    if(changes.user)
    {
      if(changes.user.firstChange || changes.user.previousValue._id!=changes.user.currentValue._id)
      {
      this.myuser = this.user
      }
    }
  }
  
  async update()
  {
    let susser = JSON.parse(JSON.stringify(this.myuser))
    if(this.myuser.address.country || this.myuser.address.city || this.myuser.address.zip||this.myuser.address.street||this.myuser.address.num)
    {
      
    }
    else
    {
      susser.address=null
    }
    await this.servis.update(susser,this.msg)
    this.parent.ngOnInit()
  }

  file(target)
  {
    this.picture = target.files.item(0);
  }

  async updatepic()
  {
    await this.servis.picture(this.picture,this.myuser._id,this.msg)
    this.parent.ngOnInit()
  }
}
