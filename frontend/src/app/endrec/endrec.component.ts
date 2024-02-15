import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-endrec',
  templateUrl: './endrec.component.html',
  styleUrls: ['./endrec.component.css']
})
export class EndrecComponent implements OnInit {

  constructor(private servis: IdentityService,private route:ActivatedRoute) { }

  pass1= ''
  pass2= ''
  msg = {msg:'',errmsg:''}
  par

  ngOnInit(): void {
    this.route.queryParamMap
  .subscribe((params:any) => {
    this.par=params.params
  }
);
  }

  prijavaNaSistem(){
    this.servis.endrec(this.par.key,this.pass1, this.pass2,this.msg)
  }
}
