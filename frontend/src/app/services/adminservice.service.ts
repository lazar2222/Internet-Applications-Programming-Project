import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { bodyChecker } from '../helper/bodyhelper';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  uri = 'http://localhost:4000/admin';

  constructor(private http: HttpClient,private router:Router) {
  }

  async getusers() {
    let body:any = await this.http.get(`${this.uri}/user`,{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }

  async getvalid() {
    let body:any = await this.http.get(`${this.uri}/valid`,{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }

  async getworkshops() {
    let body:any = await this.http.get(`${this.uri}/workshop`,{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }

  async accept(user)
  {
    let body:any = await this.http.patch(`${this.uri}/request`,{username:user.username,status:"active"},{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async reject(user)
  {
    let body:any = await this.http.patch(`${this.uri}/request`,{username:user.username,status:"inactive"},{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async acceptw(user)
  {
    let body:any = await this.http.patch(`${this.uri}/sugestion`,{id:user._id,status:"active"},{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async rejectw(user)
  {
    let body:any = await this.http.patch(`${this.uri}/sugestion`,{id:user._id,status:"inactive"},{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async del(user)
  {
    let body:any = await this.http.delete(`${this.uri}/user`,{body:{_id:user._id},withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async register(user,picture,msg)
  {
    msg.errmsg=''
    const formData = new FormData();
    if(picture)
    { 
      user.picture=true
      formData.append("profile", picture, picture.name);
    }
    else
    {
      user.picture=false
    }
    formData.append("json", JSON.stringify(user));
    let body = await this.http.post(`${this.uri}/user`, formData,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
  }

  async update(user,msg)
  {
    msg.errmsg=''
    let body:any = await this.http.patch(`${this.uri}/user`,user,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
  }

  async picture(picture,id,msg)
  {
    const formData = new FormData();
    if(picture)
    { 
      formData.append("profile", picture, picture.name);
    }
    else
    {
      formData.append("delete", "true");
    }
    formData.append("_id", id);
    let body = await this.http.post(`${this.uri}/picture`, formData,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
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
    let body = await this.http.post(`${this.uri}/workshop`, formData,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
  }
  async suggestp(data,picture,msg)
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
}
