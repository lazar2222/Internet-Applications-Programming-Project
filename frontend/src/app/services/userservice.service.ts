import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { bodyChecker } from '../helper/bodyhelper';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  uri = 'http://localhost:4000/user';

  constructor(private http: HttpClient,private router:Router) {
  }

  async update(user,msg)
  {
    msg.errmsg=''
    let body:any = await this.http.post(`${this.uri}/profile`,user,{withCredentials: true}).toPromise();
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
    let body = await this.http.post(`${this.uri}/picture`, formData,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
  }

  async interactions()
  {
    let body:any = await this.http.get(`${this.uri}/interaction`,{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return {likes:this.dedupe(body.data.likes),comments:this.dedupe(body.data.comments)}
    }
    return {likes:[],comments:[]}
  }

  dedupe(list)
  {
    let res=[]
    for(let el of list)
    {
      if(res.filter(x=>x._id==el._id).length==0)
      {
        res.push(el)
      }
    }
    return res
  }

  async deli(int)
  {
    let body:any = await this.http.delete(`${this.uri}/interaction`,{body:{_id:int._id},withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async patchi(int)
  {
    let body:any = await this.http.patch(`${this.uri}/interaction`,{_id:int._id,comment:int.comment},{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async posti(workshop,comment)
  {
    let body:any = await this.http.post(`${this.uri}/interaction`,{workshop:workshop,comment:comment},{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }

  async threads()
  {
    let body:any = await this.http.get(`${this.uri}/message`,{withCredentials: true}).toPromise();
    if(bodyChecker(body,{},this.router))
    {
      return body.data
    }
    return []
  }

  async send(ws,text)
  {
    var data = {
      workshop:ws,
      text:text
    }
    let body:any = await this.http.post(`${this.uri}/message`,data,{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
  }
}
