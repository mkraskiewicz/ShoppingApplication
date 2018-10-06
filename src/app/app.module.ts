import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CoreModule } from './core/core.module';
import { DataStorageService } from './shared/data-storage.service';
import { StoreModule } from '../../node_modules/@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    ShoppingListModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    ReactiveFormsModule
  ],
  providers: [
    DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
