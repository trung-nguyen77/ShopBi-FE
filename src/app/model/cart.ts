

export class Cart {
  private id! : number;

  constructor(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }
}
