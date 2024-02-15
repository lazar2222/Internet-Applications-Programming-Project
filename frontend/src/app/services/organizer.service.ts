import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { bodyChecker } from '../helper/bodyhelper';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  uri = 'http://localhost:4000/organizer';

  constructor(private http: HttpClient,private router:Router) {
  }

  async getworkshops() {
    let body:any = await this.http.get(`${this.uri}/workshop`,{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }

  async getAll() {
    let body:any = await this.http.get(`${this.uri}/all`,{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }

  async threads(id) {
    let body:any = await this.http.put(`${this.uri}/message`,{workshop:id},{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }

  async send(user,ws,text)
  {
    var data = {
      user:user,
      workshop:ws,
      text:text
    }
    let body:any = await this.http.post(`${this.uri}/message`,data,{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async delw(workshop)
  {
    let body:any = await this.http.delete(`${this.uri}/workshop`,{body:{_id:workshop._id},withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async upload(file,msg)
  {
    const formData = new FormData();
    if(file)
    { 
      formData.append("picture", file, file.name);
    }
    let body:any = await this.http.post(`http://localhost:4000/workshop/picture`, formData,{withCredentials: true}).toPromise();
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
    let body = await this.http.patch(`${this.uri}/workshop`, formData,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
  }

  async reservations(id)
  {
    let body:any = await this.http.post(`${this.uri}/subscription`,{workshop:id},{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }  

  async acceptu(id,type)
  {
    let body:any = await this.http.patch(`${this.uri}/subscription`,{id:id,type:type},{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }
}
