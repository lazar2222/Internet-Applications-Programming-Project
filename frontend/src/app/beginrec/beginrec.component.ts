import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-beginrec',
  templateUrl: './beginrec.component.html',
  styleUrls: ['./beginrec.component.css']
})
export class BeginrecComponent implements OnInit {

  constructor(private servis: IdentityService) { }

  email=""
  msg = {msg:'',errmsg:''}

  ngOnInit(): void {
  }

  prijavaNaSistem(){
    this.servis.beginrec(this.email,this.msg)
  }
}
