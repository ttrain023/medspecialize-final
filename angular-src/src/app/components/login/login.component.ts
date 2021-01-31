import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateLogin(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }else{

      // Validate Email
      if(!this.validateService.validateEmail(user.email)){
        this.flashMessage.show('Please use valid email', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }else{

        // Authenticate User
        this.authService.authenticateEmail(user).subscribe(data => {
          if((data as any).success){
            // this.authService.storeUserData((data as any).token, (data as any).user.email);
            this.flashMessage.show('Login Success!', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/dashboard']);
          }else{
            this.flashMessage.show((data as any).msg, {cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['/login']);
          }
        });
      }
      return true;
    }
  }

}
