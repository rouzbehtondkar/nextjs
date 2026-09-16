export class Product {
  constructor(
    public readonly name: string,
    public readonly category: string,
    public readonly price: number,
  ) {}

  getDiscountPrice(discountPercent: number) {
    return this.price - (this.price * discountPercent) / 100;
  }

  isExpensive() {
    return this.price >= 5000000;
  }
}
