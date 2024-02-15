import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IdentityService } from '../services/identity.service';
import { UserserviceService } from '../services/userservice.service';
import { dateToString } from '../helper/bodyhelper';
import { OrganizerService } from '../services/organizer.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  constructor(private servis:UserserviceService,private id:IdentityService,private os:OrganizerService) { }

  @Input() thread
  @Input() openthreads
  @Input() parent
  @Input() role

  @ViewChild('chat') chat;

  ngOnInit(): void {
  }

  close()
  {
    const index = this.openthreads.indexOf(this.thread);
    if (index > -1) { // only splice array when item is found
      this.openthreads.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  msg

  async send()
  {
    if(this.msg)
    {
      if(this.role=='user')
      {
        await this.servis.send(this.thread.workshop,this.msg)
      }
      else
      {

        await this.os.send(this.thread.user,this.thread.workshop,this.msg)
      }
      this.msg = ""
      this.parent.ngOnInit()
    }
  }

  dts(date)
  {
    return dateToString(date)
  }

  ngAfterViewChecked()
  {
    this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
  }
}

