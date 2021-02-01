import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user!: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      this.user = (profile as any).user;
    },
    err => {
      console.log(err);
      return false;
    }
    );
  }

  onUpdateSubmit(id: number){
    this.router.navigate(['/update', id]);
  }
}
