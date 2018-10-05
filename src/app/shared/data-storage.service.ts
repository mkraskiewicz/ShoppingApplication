import { Injectable } from "../../../node_modules/@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpParams, HttpRequest } from "../../../node_modules/@angular/common/http";


@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient, 
                private recipeService: RecipeService,
                private authService: AuthService){}

    storeRecipes(){

        const token = this.authService.getToken();
        const req = new HttpRequest('PUT', 'https://recipe-book-acd58.firebaseio.com/recipes.json', 
                        this.recipeService.getRecipes(), 
                        {reportProgress: true, params: new HttpParams().set('auth', token)});
        return this.httpClient.request(req);
    }

    getRecipes(){
        const token = this.authService.getToken();
        this.httpClient.get<Recipe[]>('https://recipe-book-acd58.firebaseio.com/recipes.json',
            {
                observe: 'body',
                responseType: 'json'
            })
            .map(
                (recipes) =>{
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