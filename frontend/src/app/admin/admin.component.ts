import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private servis: IdentityService) { }

  username= ''
  password= ''
  msg = {msg:'',errmsg:''}

  ngOnInit(): void {
  }

  prijavaNaSistem(){
    this.servis.admin(this.username, this.password,this.msg)
  }
}
