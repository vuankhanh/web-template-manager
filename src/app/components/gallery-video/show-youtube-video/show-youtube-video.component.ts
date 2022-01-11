import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Media } from 'src/app/Interfaces/ProductGalleryVideo';

@Component({
  selector: 'app-show-youtube-video',
  templateUrl: './show-youtube-video.component.html',
  styleUrls: ['./show-youtube-video.component.scss'],
})
export class ShowYoutubeVideoComponent implements OnInit {
  @Input() videos: Array<Media>;
  @Input() isMain: number;

  @Output() emitChangeMain = new EventEmitter<number>();
  @Output() emitAddVideo = new EventEmitter<Media>();
  @Output() emitRemoveVideo = new EventEmitter<number>();

  editing: boolean = false;

  addYotubeIdForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.addYotubeIdForm = this.formBuilder.group({
      ybUrl: ['', Validators.required],
      isMain: [false]
    })
  }

  addToList(){
    if(this.addYotubeIdForm.valid){
      let videoMedia: Media = {
        _id: '',
        type: 'youtube-video',
        youtubeId: this.addYotubeIdForm.value.ybUrl,
        isMain: this.addYotubeIdForm.value.isMain
      }
      this.emitAddVideo.emit(videoMedia);
      this.addYotubeIdForm.reset({isMain: false});
      this.editing = !this.editing;
    }
  }

  remove(index: number){
    this.emitRemoveVideo.emit(index);
  }

  setMain(index: number){
    this.emitChangeMain.emit(index);
  }
}
