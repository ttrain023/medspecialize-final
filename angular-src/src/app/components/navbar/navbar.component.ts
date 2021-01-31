import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    public authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out!', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/']);
    return false;
  }

}
