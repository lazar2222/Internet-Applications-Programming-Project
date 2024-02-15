import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {

  constructor() { }

  @Input() threads
  @Input() openthreads
  @Input() role

  ngOnInit(): void {
  }

  add(thread)
  {
    if(this.role=='user'){
    for(let ws of this.openthreads)
    {
      if(ws.workshop==thread.workshop)
      {
        return
      }
    }
      this.openthreads.push(thread)
    }
    else
    {
      for(let ws of this.openthreads)
      {
        if(ws.user==thread.user)
        {
          return
        }
      }
        this.openthreads.push(thread)
    }
  }

}
