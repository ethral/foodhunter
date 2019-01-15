
export class FoodMap {
  public name: string;
  public description: string;
  public streetAddress: string;
  public city: string;
  public state: string;
  public country: string;
  public rating : number;
  

  constructor(name: string, desc: string, stAdd: string, city: string , state: string, country: string, rating : number) {
    this.name = name;
    this.description = desc;
    this.streetAddress = stAdd;
    this.city = city;
    this.state = state;
    this.country = country;
    this.rating = rating;
    
   
  }
}
