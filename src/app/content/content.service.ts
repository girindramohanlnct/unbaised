import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from '../model/content.model';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }


  getContentByTitle(title:string) {
    return this.http.get<{message:string, contents:Content}>(environment.apiUrl +"/getContentByTitle/"+title);
  }
}
