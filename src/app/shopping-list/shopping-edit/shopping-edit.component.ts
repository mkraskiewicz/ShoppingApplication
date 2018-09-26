import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  edditedItemIndex: number;
  edditedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
    .subscribe(
      (index: number) => {
        this.edditedItemIndex = index;
        this.editMode = true;
        this.edditedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.edditedItem.name,
          amount: this.edditedItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, 
    value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.edditedItemIndex, newIngredient);
    } else {
        this.shoppingListService.onIngredientAdded(newIngredient);
    }
    this.editMode = false;
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.edditedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
