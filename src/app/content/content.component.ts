import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Content } from '../model/content.model';
import { ContentService } from './content.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  post: Content;
  content;
  topic;
  title;
  paramTitle;
  id;
  menu = [];
  isLoading = false;
  pressed = '';
  notFoud = false;
  role;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private meta: Meta,
    private authService: AuthService,
    private headTitle: Title
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      console.log("ressssssssss", res);
      this.paramTitle = res['title'];
    });

    if(this.authService.getIsAuth()) {
      this.role = this.authService.getRole();
    }

    console.log('param title ', this.paramTitle, ' ', this.topic);
    if (this.paramTitle) {
      console.log('param title ', this.paramTitle);
      this.isLoading = true;
      this.contentService
        .getContentByTitle(this.paramTitle)
        .subscribe((res) => {
          this.post = res.contents;
          this.title = res.contents.title;
          this.id = res.contents._id;
          console.log(
            'updating ',
            res.contents.title,
            ' ',
            res.contents.keyword
          );
          this.headTitle.setTitle(res.contents.title);
          this.meta.addTags([
            { name: 'keywords', content: res.contents.keyword },
            { name: 'description', content: res.contents.description },
          ]);
          this.content = res.contents.content;
          this.isLoading = false;
          console.log('titlr content', res);
        });


      }
  }

  getContentByTitle(title: string) {
    console.log("LOADING...........", title);
    this.router.navigate(['content', this.topic, title]);
    console.log('param title ', this.paramTitle);
    this.isLoading = true;
    this.contentService
      .getContentByTitle(title)
      .subscribe((res) => {
        this.post = res.contents;
        console.log(
          'updating ',
          res.contents.title,
          ' ',
          res.contents.keyword
        );
        this.headTitle.setTitle(res.contents.title);
        this.meta.addTags([
          { name: 'keywords', content: res.contents.keyword },
          { name: 'description', content: res.contents.description },
        ]);
        this.content = res.contents.content;
        this.isLoading = false;
        console.log('title content', res);
      });


  }

}
