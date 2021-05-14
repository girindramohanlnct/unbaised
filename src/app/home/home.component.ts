import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {environment } from '../../environments/environment';
import { Content } from '../model/content.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }
  posts: Content[];

  ngOnInit(): void {

    this.http.get<{message: string, status: boolean; posts: Content[]}>(environment.apiUrl+'/getPosts').subscribe(res => {
        this.posts = [...res.posts];
    });
  }

}
