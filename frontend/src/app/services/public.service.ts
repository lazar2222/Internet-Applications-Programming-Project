import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bodyChecker } from '../helper/bodyhelper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  uri = 'http://localhost:4000/public';

  constructor(private http: HttpClient,private router: Router) { }

  async workshop()
  {
    let body:any = await this.http.get(`${this.uri}/workshop`).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return [];
  }

  async topfive()
  {
    let body:any = await this.http.get(`${this.uri}/top`).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return [];
  }

  redirect(role)
  {
    if(role=='participant'||role=='organizer')
    {
      this.router.navigate(['/profile'])
    }
    else if(role=='admin')
    {
      this.router.navigate(['/admin/user'])
    }
  }
}
