import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servis: IdentityService) { }

  username= ''
  password= ''
  msg = {msg:'',errmsg:''}

  ngOnInit(): void {
  }

  prijavaNaSistem(){
    this.servis.login(this.username, this.password,this.msg)
  }
}
