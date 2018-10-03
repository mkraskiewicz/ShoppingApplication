import { Injectable } from "../../../node_modules/@angular/core";
import { Http } from "../../../node_modules/@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService){}

    storeRecipes(){

        return this.http.put('https://recipe-book-acd58.firebaseio.com/recipies.json', 
            this.recipeService.getRecipes());
    }

    getRecipes(){

        this.http.get('https://recipe-book-acd58.firebaseio.com/recipies.json')
            .map(
                (response) =>{
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if(!recipe['ingredients']){
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipies: Recipe[]) => {
                    this.recipeService.setRecipes(recipies);
                }
            );
    }
}