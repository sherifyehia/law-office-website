import { Component, computed, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { TeamMember } from '../../core/content.service';

@Component({
  selector: 'app-team',
  imports: [NgFor, NgIf],
  templateUrl: './team.component.html',
  styleUrls: ['./team.scss'],
})
export class TeamComponent {
  readonly teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Alyssa Morgan',
      role: 'Senior Partner',
      bio: 'A trusted legal strategist with 18 years of courtroom success, specializing in business disputes and family law.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: '2',
      name: 'Evan Brooks',
      role: 'Litigation Director',
      bio: 'Expert negotiator who turns complex disputes into clear outcomes, helping clients stay secure through every stage.',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: '3',
      name: 'Maya Chen',
      role: 'Senior Counsel',
      bio: 'Focused on client-first advocacy, offering calm guidance for sensitive cases and high-stakes negotiations.',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    },
  ];

  readonly selectedMember = signal<TeamMember | null>(null);
  readonly isModalOpen = computed(() => this.selectedMember() !== null);

  openModal(member: TeamMember): void {
    this.selectedMember.set(member);
  }

  closeModal(): void {
    this.selectedMember.set(null);
  }
}

