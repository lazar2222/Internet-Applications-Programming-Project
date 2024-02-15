import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bodyChecker, bodyChecker2 } from '../helper/bodyhelper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  uri = 'http://localhost:4000/identity';
  uri2 = 'http://localhost:4000/user';

  constructor(private http: HttpClient,private router:Router) {
    //this.user = JSON.parse(localStorage.getItem('user'))
    this.profile()
   }

  user
  header

  async login(username, password,msg) {
    const data = {
      username: username,
      password: password,
    }
    let body = await this.http.post(`${this.uri}/login`, data,{withCredentials: true}).toPromise();
    if(bodyChecker(body,msg,this.router))
    {
        this.profile()
    }
  }

  async admin(username, password,msg) {
    const data = {
      username: username,
      password: password,
    }
    let body = await this.http.post(`${this.uri}/admin`, data,{withCredentials: true}).toPromise();
    if(bodyChecker(body,msg,this.router))
    {
        this.profile()
    }
  }

  async profile()
  {
    let body:any = await this.http.get(`${this.uri2}/profile`,{withCredentials: true}).toPromise();
    if(bodyChecker2(body,{},this.router,this))
    {
      //localStorage.setItem('user',JSON.stringify(body.data))
      this.user=body.data
    }
    else
    {
      this.user=null
    }
    if(this.header)
    {
      this.header.ngOnInit()
    }
  }

  role()
  {
    if(this.user==null)
    {
      return 'guest'
    }
    else
    {
      return this.user.role;
    }
  }

  async logout()
  {
    let body:any = await this.http.post(`${this.uri2}/logout`,{},{withCredentials: true}).toPromise();
    bodyChecker(body,{},this.router)
    //localStorage.removeItem('user')
    this.user=null
    this.header.ngOnInit()
  }

  async beginrec(email,msg)
  {
    const data = {
      email: email
    }
    let body = await this.http.post(`${this.uri}/beginrecovery`, data,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
  }

  async endrec(key,pass1,pass2,msg)
  {
    const data = {
      key: key,
      password: pass1,
      repeatpassword: pass2
    }
    let body = await this.http.post(`${this.uri}/finishrecovery`, data,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
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
    let body = await this.http.post(`${this.uri}/register`, formData,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
  }

  async changepass(data,msg)
  {
    let body = await this.http.patch(`${this.uri2}/password`, data,{withCredentials: true}).toPromise();
    bodyChecker(body,msg,this.router)
    this.user=null
    this.header.ngOnInit()
  }
}
