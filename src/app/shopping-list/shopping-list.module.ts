import { NgModule } from "../../../node_modules/@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from "../../../node_modules/@angular/common";
import { FormsModule } from "../../../node_modules/@angular/forms";

@NgModule(
    {
        declarations: [
            ShoppingEditComponent,
            ShoppingListComponent
        ],
        imports: [
            CommonModule,
            FormsModule
        ]
    })
export class ShoppingListModule {}