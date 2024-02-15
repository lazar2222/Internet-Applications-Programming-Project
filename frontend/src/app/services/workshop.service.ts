import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { bodyChecker } from '../helper/bodyhelper';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  uri = 'http://localhost:4000/workshop';

  constructor(private http: HttpClient,private router: Router) { }

  async upload(file,msg)
  {
    const formData = new FormData();
    if(file)
    { 
      formData.append("picture", file, file.name);
    }
    let body:any = await this.http.post(`${this.uri}/picture`, formData,{withCredentials: true}).toPromise();
    if(bodyChecker(body,msg,this.router))
    {
      return body.data.path
    }
    else
    { 
      return null
    }
  }

  async suggest(data,picture,msg)
  {
    msg.errmsg=''
    const formData = new FormData();
    if(picture)
    { 
      formData.append("picture", picture, picture.name);
    }
    formData.append("json", JSON.stringify(data));
    let body = await this.http.post(`${this.uri}/suggest`, formData,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
  }

  async past()
  {
    let body:any = await this.http.get(`${this.uri}/past`,{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }

  async subscriptions()
  {
    let body:any = await this.http.get(`${this.uri}/subscription`,{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }

  async postsub(workshop,type)
  {
    let body:any = await this.http.post(`${this.uri}/subscription`,{workshop:workshop,type:type},{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async delsub(sub)
  {
    let body:any = await this.http.delete(`${this.uri}/subscription`,{body:{workshop:sub.wid},withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async seats(workshop)
  {
    let body:any = await this.http.post(`${this.uri}/seats`,{workshop:workshop._id},{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data.count
    }
    else
    {
      return 0
    }
  }

  async interactions(workshop)
  {
    let body:any = await this.http.post(`${this.uri}/interaction`,{workshop:workshop.title},{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }
}
