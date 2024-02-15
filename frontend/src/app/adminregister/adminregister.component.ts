import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../services/adminservice.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css']
})
export class AdminregisterComponent implements OnInit {

  constructor(private servis: AdminserviceService) { }

  msg = {msg:'',errmsg:''}
  fname
  lname
  username
  password
  password2
  phone
  email
  organizer = false
  orgName
  orgId
  country
  city
  zip
  street
  num
  picture

  ngOnInit(): void {
  }

  file(files)
  {
    this.picture = files.files.item(0);
  }

  register()
  {
    var user:any = 
    {
      firstName:this.fname,
      lastName:this.lname,
      username:this.username,
      password:this.password,
      repeatpassword:this.password2,
      phone:this.phone,
      email:this.email,
      organizer:this.organizer,
      orgName:this.orgName,
      orgId:this.orgId,
    }
    var address ={
      country:this.country,
      city:this.city,
      zip:this.zip,
      street:this.street,
      number:this.num
    }
    if(this.country || this.city || this.zip||this.street||this.num)
    {
      user.address=address
    }
    this.servis.register(user,this.picture,this.msg)
  }
}
