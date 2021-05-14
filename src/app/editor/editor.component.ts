import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorService } from './editor.service';
import { Content } from '../model/content.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editform: FormGroup;
  id;
  post:Content;

  editorContent: string;
  mode;

  editorStyle = {
    height: "300px"
  };

  // config = {
  //   toolbar: [["bold", "italic", "uderline"]],
  // };

  constructor(private route: ActivatedRoute, private editorService: EditorService,
    private router: Router, private http: HttpClient) { }
  

  ngOnInit() {


    this.editform = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      editor: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      keyword: new FormControl(null, {validators: [Validators.required]}),
      type: new FormControl(null),
      nextPage: new FormControl(null),
      previousPage: new FormControl(null),
      videoUrl: new FormControl(null),
      subTopic: new FormControl(null),
    });

    this.route.paramMap.subscribe((res) => {
      console.log(res['params']);
      this.id = res['params']['topicId'];
    })

    if(this.id  != null && this.id !== "contact") {

      this.mode = "edit"
      this.editorService.getPostForEdit(this.id).subscribe(res => {
        console.log(res.content);
        this.post = {...res.content}
        this.editform.setValue({ editor:res.content.content, title:res.content.title, description:res.content.description,
          keyword:res.content.keyword, type:res.content.type, nextPage:res.content.nextPage, previousPage:res.content.previousPage,
          videoUrl:res.content.videoUrl, subTopic:res.content.subTopic })
      });
    }
    else {
      this.mode = 'create';
      this.id = null;
    }

    
  }

  onSubmit() {
    console.log("works ", this.mode);
    this.editorContent = this.editform.get("editor").value;
    let content = this.editform.value.editor;
    let title = this.editform.value.title;
    let description = this.editform.value.description;
    let keyword = this.editform.value.keyword;
    let type = this.editform.value.type;
    let nextPage = this.editform.value.nextPage;
    let previousPage = this.editform.value.previousPage;
    let videoUrl = this.editform.value.videoUrl;
    let subTopic = this.editform.value.subTopic;
    let data = { content:content, title:title, description:description, keyword:keyword, type:type, nextPage:nextPage, previousPage:previousPage, videoUrl:videoUrl, subTopic:subTopic }
    console.log(typeof data);
    console.log(data);
    if(this.mode==='edit') {
      let postData:Content = {_id:this.id, content:this.editform.value.editor, title:this.editform.value.title, description:this.editform.value.description, keyword:this.editform.value.keyword, type:this.editform.value.type,
        nextPage:this.editform.value.nextPage, previousPage:this.editform.value.previousPage, videoUrl:this.editform.value.videoUrl,  subTopic:this.editform.value.subTopic }
      this.editorService.updatePost(this.id, postData).subscribe(res => {
        
        console.log("success ", res.content.description);
        this.router.navigate(['/']);

      });
    }
    else {
      this.http.post(environment.apiUrl+"/createPost", data).subscribe(res => {
        console.log("saved ");
      })
    }
    }
  }


