import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

   constructor(private slService: ShoppingListService) { }

   ngOnInit(): void {
     this.subscription = this.slService.startedEditing.subscribe(
       (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
       }
     );
  }

  //submitting the button when adding ingredient
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount );
    if (this.editMode) {//this means if editMode is true
        this.slService.updateIngredient(this.editedItemIndex, newIngredient);//call update ingredient
    } else {
      this.slService.addIngredient(newIngredient);//add ingredient
    }
    this.editMode = false;//this will make it able to switch from add to update when the form is reset
    form.reset();//reset the form
  }

  // remove typed in text in the input fields
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  //delete an ingredient from the list
  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
