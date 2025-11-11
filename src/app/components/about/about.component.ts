import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { About } from 'src/app/models/about.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  about?: About;
  loading = true;
  error = '';

  // Show stable, trustable metrics (adjust if you later want to fetch them)
  metrics = [
    { label: 'Years Experience', value: '14+' },
    { label: 'Employees Managed', value: '7000+' },
    { label: 'Statutory Compliance', value: '100%' }
  ];

  // list of skills / tools (you can replace with data from API if desired)
  skills = {
    payroll: ['PF', 'ESIC', 'NPS', 'Gratuity', 'Bonus Act', 'LWF'],
    automation: ['Excel VBA', 'Power Automate', 'Power Query'],
    reporting: ['Excel Dashboards', 'Pivot Tables'],
    portals: ['EPFO Portal', 'ESIC Portal', 'NPS CRA', 'Ascent Payroll']
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAbout().subscribe({
      next: (d) => { this.about = d; this.loading = false; },
      error: (e) => { console.error(e); this.error = 'Failed to load about info'; this.loading = false; }
    });
  }
}
