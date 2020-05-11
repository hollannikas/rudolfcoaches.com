import { Component, OnInit } from '@angular/core';
import { Blog, ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  entries$: Observable<Entry<Blog>>;

  constructor(private contentfulService: ContentfulService) {
    this.entries$ = this.contentfulService.getEntries();
  }

}
