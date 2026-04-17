import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  slug: string;
  publishedAt: string;
  featuredImage?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

interface StrapiMedia {
  data: {
    attributes: {
      url: string;
    } | null;
  } | null;
}

interface StrapiAttributes<T> {
  id: number;
  attributes?: T;
  title?: string;
  description?: string;
  content?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  cover?: StrapiMedia;
}

interface StrapiCollection<T> {
  data: StrapiAttributes<T>[];
}

interface ArticleAttributes {
  title: string;
  description: string;
  content?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover?: StrapiMedia;
}

interface TeamMemberAttributes {
  name: string;
  role: string;
  bio: string;
  photo?: StrapiMedia;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly apiUrl = 'http://localhost:1337/api';

  constructor(private readonly http: HttpClient) {}

  getArticles(): Observable<ArticleItem[]> {
    return this.http
      .get<StrapiCollection<ArticleAttributes>>(
        `${this.apiUrl}/articles?populate=cover`
      )
      //.pipe(map((response) => response.data.map(this.mapArticle)));
      .pipe(
      map(res => res.data.map((item: any) => this.mapArticle(item)))
    );
  }

  getTeam(): Observable<TeamMember[]> {
    return this.http
      .get<StrapiCollection<TeamMemberAttributes>>(
        `${this.apiUrl}/team-members?populate=photo`
      )
      .pipe(map((response) => response.data.map(this.mapTeamMember)));
  }

  private mapArticle(entity: StrapiAttributes<ArticleAttributes>): ArticleItem {
    const data = entity.attributes || entity;
    return {
      id: String(entity.id),
      title: data.title || '',
      summary: data.description || '',
      content: data.content,
      slug: data.slug || '',
      publishedAt: data.publishedAt || data.createdAt || '',
      featuredImage: this.extractMediaUrl(data.cover)
    };
  }


  private mapTeamMember(entity: StrapiAttributes<TeamMemberAttributes>): TeamMember {
    const data = entity.attributes || entity;
    return {
      id: String(entity.id),
      name: (data as any).name || '',
      role: (data as any).role || '',
      bio: (data as any).bio || ''
      //photo: this.extractMediaUrl((data as any).photo),
    };
  }
/*
  private extractMediaUrl(media?: StrapiMedia): string | undefined {
    return media?.data?.attributes?.url ?? undefined;
  }
*/
  private extractMediaUrl(cover: any): string | undefined {
  if (!cover) return undefined;

  const url =
    cover.formats?.small?.url ||
    cover.formats?.thumbnail?.url ||
    cover.url;

  return `http://localhost:1337${url}`;
}
}
