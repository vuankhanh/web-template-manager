import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { toHTML } from "ngx-editor";
import { Posts } from 'src/app/Interfaces/Posts';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() editorContent: Posts;
  preview: string = '';
  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    this.preview =  toHTML(JSON.parse(this.editorContent.data));
  } 
}
