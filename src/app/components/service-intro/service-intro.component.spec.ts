import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIntroComponent } from './service-intro.component';

describe('ServiceIntroComponent', () => {
  let component: ServiceIntroComponent;
  let fixture: ComponentFixture<ServiceIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
