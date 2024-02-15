import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { bodyChecker } from '../helper/bodyhelper';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsharingserviceService {

  constructor(private http: HttpClient,private router: Router) { }

  uri = 'http://localhost:4000/workshop';

  workshop=null

  async details(workshop)
  {
    let body:any = await this.http.post(`${this.uri}/details`,{workshop:workshop._id},{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      this.workshop=body.data
    }
  }
}
