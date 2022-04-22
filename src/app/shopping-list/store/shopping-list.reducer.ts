import {Action} from '@ngrx/store'
import { Ingredient } from '../../shared/ingredient.model'
import * as shoppingListActions  from './shopping-list.actions'

const initialState = {
  ingredients: [ ]

}
export function shoppingListReducer(state=initialState, action){
switch (action.type){

    case shoppingListActions.ADD_INGREDIENT: 
    return  {
      ...state, ingredients: [...state.ingredients, action.payload]
     } ;

    default: return state
}
}