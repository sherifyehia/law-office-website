import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.scss'],
})
export class ContactComponent {
  readonly name = signal('');
  readonly email = signal('');
  readonly subject = signal('');
  readonly message = signal('');

  private readonly recipient = 'contact@lawoffice.com';

  readonly gmailUrl = computed(() => {
    const subject = encodeURIComponent(this.subject() || 'New law office inquiry');
    const body = encodeURIComponent(
      `Name: ${this.name()}
Email: ${this.email()}

${this.message()}`.trim()
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      this.recipient
    )}&su=${subject}&body=${body}`;
  });

  readonly mailtoUrl = computed(() => {
    const subject = encodeURIComponent(this.subject() || 'New law office inquiry');
    const body = encodeURIComponent(
      `Name: ${this.name()}
Email: ${this.email()}

${this.message()}`.trim()
    );
    return `mailto:${encodeURIComponent(this.recipient)}?subject=${subject}&body=${body}`;
  });
}

