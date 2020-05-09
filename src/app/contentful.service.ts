import { Injectable } from '@angular/core';
import { CONFIG } from './config';
import { createClient, Entry } from 'contentful';
import { from, Observable } from 'rxjs';
import { map, mergeAll} from 'rxjs/operators';

export interface ContentfulResponse {
  items: Entry<Blog>[];
}

export interface Blog {
  title: string;
  text: string;
  created: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private cdaClient;

  constructor() {
    this.cdaClient = createClient({
      space: CONFIG.space,
      accessToken: CONFIG.accessToken
    });
  }

  getEntries(): Observable<Entry<Blog>> {
    return from(this.cdaClient.getEntries({content_type: 'blog_post'}))
      .pipe(map((response: ContentfulResponse) => response.items as Entry<Blog>[]))
      .pipe(mergeAll());
  }
}
