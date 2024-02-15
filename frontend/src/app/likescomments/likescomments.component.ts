import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-likescomments',
  templateUrl: './likescomments.component.html',
  styleUrls: ['./likescomments.component.css']
})
export class LikescommentsComponent implements OnInit {

  constructor(private servis:UserserviceService) { }

  async ngOnInit(){
    this.data = await this.servis.interactions()
  }

  data={likes:[],comments:[]}
  editcomment={_id:"",comment:""}
  errmsg

  async del(int)
  {
    await this.servis.deli(int)
    this.ngOnInit()
  }

  edit(cmnt)
  {
    this.editcomment=JSON.parse(JSON.stringify(cmnt))
  }


  async commit()
  {
    this.errmsg=""
    if(this.editcomment.comment)
    {
      await this.servis.patchi(this.editcomment)
      this.ngOnInit()
      this.editcomment={_id:"",comment:""}
    }
    else
    {
      this.errmsg="Komentar ne sme biti prazan"
    }
  }

  close()
  {
    this.editcomment={_id:"",comment:""}
  }

}
