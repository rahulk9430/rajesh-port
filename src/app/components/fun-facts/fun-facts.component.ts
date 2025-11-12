import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { FunFactsData } from 'src/app/models/service.model';

@Component({
  selector: 'app-fun-facts',
  templateUrl: './fun-facts.component.html',
  styleUrls: ['./fun-facts.component.css']
})
export class FunFactsComponent implements OnInit {
  data!: FunFactsData;
  loading = true;
  error = false;

  constructor(private svc: DataService) {}

  ngOnInit(): void {
    this.svc.getFunFacts().subscribe({
      next: (d) => { this.data = d; this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}
