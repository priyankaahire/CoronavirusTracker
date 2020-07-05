import { Component } from '@angular/core';
import { ApiService } from 'src/app/providers/api-service';

@Component({
  selector: 'app-news',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss']
})
export class NewsPage {
   newsData: any = []
  constructor(private _apiService: ApiService) {
  }
}
