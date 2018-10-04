import { Component, OnInit, Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from './auth/auth.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  featureType: string = 'recipe';

  constructor(private authService: AuthService){}

  ngOnInit(){
    
    firebase.initializeApp({
      apiKey: "AIzaSyDAbQc3XOLhV9H5oAyfNZa1dYGn7CKZUR0",
      authDomain: "recipe-book-acd58.firebaseapp.com"
    });
    this.authService.loadUser();
  }

  onNavigate(feature: string){
    this.featureType = feature;
  }
}
