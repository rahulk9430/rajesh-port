import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { ServiceIntroData } from 'src/app/models/service.model';

@Component({
  selector: 'app-service-intro',
  templateUrl: './service-intro.component.html',
  styleUrls: ['./service-intro.component.css']
})
export class ServiceIntroComponent implements OnInit {
  data!: ServiceIntroData;
  loading = true;
  error = false;

  constructor(private svc: DataService) {}

  ngOnInit(): void {
    this.svc.getServiceIntro().subscribe({
      next: (d) => {
        this.data = d;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  // normalize to array of paragraphs (safe even if body is string)
  get paragraphs(): string[] {
    const b = this.data?.body ?? '';
    return Array.isArray(b) ? b : [String(b)];
  }
}
