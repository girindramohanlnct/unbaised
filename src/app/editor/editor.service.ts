import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Content } from '../model/content.model'
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor( private http: HttpClient) {}

  getPostForEdit(id:string) {
   return this.http.get<{ message:string, content:Content }>(environment.apiUrl+"/getPostForUpdate/"+ id);
  }

  updatePost(id:string, post:Content) {
    console.log("edit blog.....................");
    return this.http.put<{ message:string, content:Content }>(environment.apiUrl+"/updatePost/"+ id, post);
  }
}
