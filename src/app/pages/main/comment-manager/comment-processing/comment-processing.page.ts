import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-processing',
  templateUrl: './comment-processing.page.html',
  styleUrls: ['./comment-processing.page.scss'],
})
export class CommentProcessingPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const commentId = this.activatedRoute.snapshot.params.commentId;
    console.log(commentId);
  }

}
