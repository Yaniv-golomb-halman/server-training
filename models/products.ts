import { Document, Model, model, Schema } from "mongoose";
import { Product } from "../types/product";

export default interface ProductsModel extends Product, Document {}

const productsSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  amountInStock: { type: Number, default: 1 },
  image: { type: String, required: true },
});

//type?
export const productsModel: Model<ProductsModel> = model<ProductsModel>(
  "Product",
  productsSchema
);
