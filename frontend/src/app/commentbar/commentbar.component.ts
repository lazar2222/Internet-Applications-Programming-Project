import { Component, Input, OnInit } from '@angular/core';
import { dateToString } from '../helper/bodyhelper';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-commentbar',
  templateUrl: './commentbar.component.html',
  styleUrls: ['./commentbar.component.css']
})
export class CommentbarComponent implements OnInit {

  constructor(public us:UserserviceService) { }

  @Input() parent
  @Input() comments
  comment
  msg
  

  ngOnInit(): void {
  }

  async post()
  {
    this.msg=""
    if(this.comment)
    {
      await this.us.posti(this.parent.workshop.title,this.comment) 
      this.parent.ngOnInit()
      this.comment=""
    }
    else
    {
      this.msg = "Komentar mora imati tekst"
    }
  }

  dts(date)
  {
    return dateToString(date)
  }

}
