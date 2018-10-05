import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }

  getError(){
    return this.authService.getError();
  }

}
