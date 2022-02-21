import { Schema, model, Model } from "mongoose";

const productsSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  amountInStock: { type: Number, default: 1 },
  image: { type: String, required: true },
});

//type?
export const productsModel: Model<typeof productsSchema> = model(
  "Product",
  productsSchema
);
