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
  public creator?: string;
  public createdOn?: Date;
  public createdBy?: string;

  constructor(name: string, description: string, imgUrl: string, instruction: string, ingredients:Ingredient[] ,vidUrls:VidUrl[],creator: string, createdOn: Date){
    this.name = name;
    this.description = description;
    this.instruction = instruction;
    this.ingredients = ingredients;
    this.imgUrl = imgUrl;
    this.vidUrls = vidUrls;
    this.creator = creator;
    this.createdOn = createdOn

  }
  



}


