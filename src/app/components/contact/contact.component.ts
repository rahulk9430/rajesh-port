import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

interface ContactControls {
  name: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  subject: AbstractControl;
  message: AbstractControl;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  sending = false;
  successMsg = '';
  errorMsg = '';

  // Formspree endpoint (optional — set to your endpoint if you want server emails)
  formspreeEndpoint = ''; // e.g. https://formspree.io/f/yourFormId

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9+\-\s()]{7,20}$/)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Typed getter so template type-checker knows exact control names exist
  get f(): ContactControls {
    return this.contactForm.controls as unknown as ContactControls;
  }

  onSubmit(): void {
    this.successMsg = '';
    this.errorMsg = '';

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      phone: this.f['phone'].value,
      subject: this.f['subject'].value,
      message: this.f['message'].value,
      sentAt: new Date().toISOString()
    };

    if (this.formspreeEndpoint) {
      this.sending = true;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(this.formspreeEndpoint, payload, { headers, responseType: 'json' })
        .subscribe({
          next: () => {
            this.sending = false;
            this.successMsg = 'Message sent. I will get back to you soon — thank you!';
            this.contactForm.reset();
          },
          error: (err: HttpErrorResponse) => {
            this.sending = false;
            this.errorMsg = 'Could not send the message. Please try again or use mail option below.';
            console.error('Contact submit error', err);
          }
        });
    } else {
      // mailto fallback
      const subject = encodeURIComponent(payload.subject);
      const bodyParts = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.phone ? `Phone: ${payload.phone}` : null,
        '',
        payload.message
      ].filter(Boolean);
      const body = encodeURIComponent(bodyParts.join('\n'));
      const mailto = `mailto:rahulkumar.hr@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.successMsg = '';
    this.errorMsg = '';
  }
}
