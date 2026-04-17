import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, DatePipe, NgIf, NgFor } from '@angular/common';

import { ContentService, ArticleItem } from '../../core/content.service';

@Component({
  selector: 'app-articles',
  imports: [AsyncPipe, DatePipe, NgIf, NgFor],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.scss'],
})
export class ArticlesComponent {
  private readonly contentService = inject(ContentService);
  readonly expandedArticles = signal<Set<string>>(new Set());

  readonly articles$ = this.contentService.getArticles();

  toggleReadMore(articleId: string): void {
    const current = this.expandedArticles();
    const newSet = new Set(current);
    if (newSet.has(articleId)) {
      newSet.delete(articleId);
    } else {
      newSet.add(articleId);
    }
    this.expandedArticles.set(newSet);
  }

  isExpanded(articleId: string): boolean {
    return this.expandedArticles().has(articleId);
  }
}

