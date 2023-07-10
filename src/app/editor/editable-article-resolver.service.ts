import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Article, ArticlesService, UserService } from '../core';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class EditableArticleResolver implements Resolve<Article | null> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article | null> {
    return this.articlesService.get(route.params['slug']).pipe(
      switchMap((article: Article) => {
        const currentUser = this.userService.getCurrentUser();
        if (currentUser && currentUser.username === article.author.username) {
          return of(article);
        } else {
          this.router.navigateByUrl('/');
          return of(null);
        }
      }),
      catchError((err) => {
        this.router.navigateByUrl('/');
        return of(null);
      })
    );
  }
}
