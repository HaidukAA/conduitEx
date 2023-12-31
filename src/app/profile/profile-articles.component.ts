import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleListConfig, Profile } from '../core';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html'
})
export class ProfileArticlesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile?: Profile;
  articlesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  ngOnInit() {
    if (this.route.parent && this.route.parent.data) {
      this.route.parent.data.subscribe(
        (data: { profile?: Profile }) => {
          if (data.profile) {
            this.profile = data.profile;
            this.articlesConfig = {
              type: 'all',
              filters: {
                author: this.profile.username
              }
            };
          }
        }
      );
    }
  }

}
