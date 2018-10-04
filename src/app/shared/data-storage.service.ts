import { Injectable } from "../../../node_modules/@angular/core";
import { Http } from "../../../node_modules/@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {

    constructor(private http: Http, 
                private recipeService: RecipeService,
                private authService: AuthService){}

    storeRecipes(){

        const token = this.authService.getToken();
        return this.http.put('https://recipe-book-acd58.firebaseio.com/recipes.json?auth=' + token, 
            this.recipeService.getRecipes());
    }

    getRecipes(){
        const token = this.authService.getToken();

        this.http.get('https://recipe-book-acd58.firebaseio.com/recipes.json?auth=' + token)
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
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}