import { Product } from "./Product";

export class DigitalProduct extends Product {
  getDeliveryInfo() {
    return "تحویل فوری و دیجیتال";
  }
}
