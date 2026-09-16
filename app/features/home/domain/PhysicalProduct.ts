import { Product } from "./Product";

export class PhysicalProduct extends Product {
  getDeliveryInfo() {
    return "ارسال به آدرس شما";
  }
}
