import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { heroPencilSquareSolid } from '@ng-icons/heroicons/solid';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, AsyncPipe, NgIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  viewProviders: [
    provideIcons({
      heroPencilSquareSolid,
    }),
  ],
})
export class DashboardComponent {
  private readonly userService = inject(UserService);
  userInformation$!: Observable<User>;
  totalFixedCost$!: Observable<number>;

  ngOnInit() {
    this.userInformation$ = this.userService.getUserInformation();
    this.totalFixedCost$ = this.userService.getTotalFixedCost();
  }
}
