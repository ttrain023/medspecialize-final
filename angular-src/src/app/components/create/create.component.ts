import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
// import { AuthService } from '../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  email!: string;
  password!: String;
  name!: String;
  status!: Boolean;
  role!: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    // private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onCreateSubmit(){

    const user = {
      email: this.email,
      password: this.password,
      name: this.name,
      // status: this.status,
      role: this.role
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }else{

      // Validate Email
      if(!this.validateService.validateEmail(user.email)){
        this.flashMessage.show('Please use valid email', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }else{

        // // Register User
        // this.authService.registerUser(user).subscribe(data => {
        //   if(data){
        //     this.flashMessage.show('You are now registered into the system', {cssClass: 'alert-success', timeout: 3000});
        //     this.router.navigate(['/login']);
        //   }else{
        //     this.flashMessage.show('Something went Wrong', {cssClass: 'alert-danger', timeout: 3000});
        //     this.router.navigate(['/register']);
        //   }
        // });
      }
      return true;
    }
  }

}
