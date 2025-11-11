import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { About } from '../models/about.model';
import { Experience } from '../models/experience.model';
import { Project } from '../models/project.model';
import { Contact } from '../models/contact.model';
import { FooterData } from '../models/footer.model';
import { ServiceItem } from '../models/service.model';
import { HeroData } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // adjust paths depending on where you put mocks (app/mocks or assets/mocks)
  private base = '/assets/mocks'; // recommended: move mocks to src/assets/mocks

  constructor(private http: HttpClient) {}

  getAbout(): Observable<About> {
    return this.http.get<About>(`${this.base}/about.json`);
  }

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.base}/experiences.json`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.base}/projects.json`);
  }

  getContact(): Observable<Contact> {
  return this.http.get<Contact>(`${this.base}/contact.json`);
}

  getFooter():Observable<FooterData>{
    return this.http.get<FooterData>(`${this.base}/footer.json`);
  }

  getServices(): Observable<ServiceItem[]> {
  return this.http.get<ServiceItem[]>(`${this.base}/services.json`);
}

getHero(): Observable<HeroData> {
  return this.http.get<HeroData>(`${this.base}/hero.json`);
}

  // if you prefer synchronous import (not HTTP) you could also export .ts mock files and import them directly
}
