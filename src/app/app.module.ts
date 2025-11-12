import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { HeroComponent } from './components/hero/hero.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceComponent } from './components/service/service.component';
import { MapTagsPipe } from './core/pipes/map-tags.pipe';
import { HomeComponent } from './components/home/home.component';
import { ServiceIntroComponent } from './components/service-intro/service-intro.component';
import { FunFactsComponent } from './components/fun-facts/fun-facts.component';
import { ServicesGridComponent } from './components/services-grid/services-grid.component';
import { TestimonialCarouselComponent } from './components/testimonial-carousel/testimonial-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    HeroComponent,
    ContactComponent,
    ServiceComponent,
    MapTagsPipe,
    HomeComponent,
    ServiceIntroComponent,
    FunFactsComponent,
    ServicesGridComponent,
    TestimonialCarouselComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   // provides RouterModule.forRoot(...)
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
