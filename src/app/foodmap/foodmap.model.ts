export class FoodMap {
  public name: string;
  public description: string;
  public streetAddress: string;
  public city: string;
  public state: string;
  public country: string;
  public rating: number;
  public key?: string;

  constructor(
    name: string,
    desc: string,
    stAdd: string,
    city: string,
    state: string,
    country: string,
    rating: number,
    key?: string
  ) {
    this.name = name;
    this.description = desc;
    this.streetAddress = stAdd;
    this.city = city;
    this.state = state;
    this.country = country;
    this.rating = rating;
    if (key) {
      this.key = key;
    }
  }
}
