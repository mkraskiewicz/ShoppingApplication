import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '../../../node_modules/@angular/router';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class AuthService {

    token: string;
    emailAddress: string;
    error: string;

    constructor(private router: Router){}

    signupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/']);
                })
            .catch(
                
                error =>{console.log(error),
                this.error = error}
            )
    }

    signinUser(email: string, password: string){

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    );
                }
            )
            .catch(
                error =>{console.log(error),
                    this.error = error}
            );
    }

    logout(){
        firebase.auth().signOut()
            .then(
                response => {
                    this.router.navigate(['/']);
                });
        this.token = null;
    }

    getToken(){

        firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    );
        return this.token;
    }

    isAuthenticated(){

        return this.token != null;
    }

    loadUser() {

        firebase.auth().onAuthStateChanged(
            (currentUser) => {
                if(currentUser === null){
                    this.token = null;
                    this.emailAddress = null
                } else {
                    currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        );
                    this.emailAddress = currentUser.email;
                }
            }
        )
    }

    getError(){
        
        return this.error;
    }

    getEmail(){

        return this.emailAddress;
    }

}