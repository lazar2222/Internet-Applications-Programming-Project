import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GcsService {

  constructor(private http: HttpClient,private router: Router) { }

  uri = 'https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=';

  async geocode(query)
  {
    let body:any = await this.http.get(this.uri+query).toPromise()
    if(body && body.length>0)
    {
      return body[0]
    }
    else
    {
      return {lat: 44.805379, lon: 20.476003}
    }
  }
}
