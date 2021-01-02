import {Ingredient} from '../shared/ingredient.model';
import {VidUrl} from '../shared/vidUrl.model'

export class Recipe{
  public id: string;
  public name: string;
  public description: string;
  public ingredients: Ingredient[];
  public imgUrl: string;
  public instruction: string;
  public vidUrls: VidUrl[] ;

  constructor(name: string, description: string, imgUrl: string, instruction: string, ingredients:Ingredient[] ,vidUrls:VidUrl[]){
    this.name = name;
    this.description = description;
    this.instruction = instruction;
    this.ingredients = ingredients;
    this.imgUrl = imgUrl;
    this.vidUrls = vidUrls
  }
  



}


