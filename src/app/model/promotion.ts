export class Promotion {
  public id: number;
  public name: string;
  public discount: number;

  constructor(id: number, name: string, discount: number) {
    this.id = id;
    this.name = name;
    this.discount = discount;
  }
}
