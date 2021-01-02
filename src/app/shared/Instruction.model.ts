import { Recipe } from '../recipes/recipe.model';

export interface Instruction{
    recipe?: Recipe;
    state: boolean
}