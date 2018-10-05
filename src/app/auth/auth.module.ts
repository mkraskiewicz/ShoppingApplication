import { NgModule } from "../../../node_modules/@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { FormsModule } from "../../../node_modules/@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { CommonModule } from "../../../node_modules/@angular/common";

@NgModule({
    declarations:[
        SigninComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}