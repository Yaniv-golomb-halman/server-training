import { NextFunction, Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { productsModel } from "../models/products";
import * as HttpStatus from "http-status-codes";

export const productsRouter = Router();

productsRouter.get(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productsModel.find().catch((err) => next(err));
    res.send(products);
  }
);

productsRouter.get("/:id", getProduct, (req: Request, res: Response) => {
  res.send((res as any).product);
  req.params.id;
});

productsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const product = new productsModel({
      name: req.body.name,
      price: req.body.price,
      amountInStock: req.body.amountInStock,
      image: req.body.image,
    });
    const newProduct = await product.save().catch((err) => next(err));
    res.status(HttpStatus.CREATED).json(newProduct);
  }
);

productsRouter.patch(
  "/:id",
  getProduct,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!!req.body.name) {
      (res as any).product.name = req.body.name;
    }
    if (!!req.body.price) {
      (res as any).product.price = req.body.price;
    }
    if (!!req.body.amountInStock) {
      (res as any).product.amountInStock = req.body.amountInStock;
    }
    if (!!req.body.image) {
      (res as any).product.image = req.body.image;
    }
    const updatedProduct = await (res as any).product
      .save()
      .catch((err) => next(err));
    res.json(updatedProduct);
  }
);

productsRouter.delete(
  "/:id",
  getProduct,
  async (req: Request, res: Response, next: NextFunction) => {
    await (res as any).product.remove().catch((err) => next(err));
    res.json({ mesage: "deleted product" });
  }
);
async function getProduct(req: Request, res: Response, next: NextFunction) {
  const product = await productsModel
    .findById((req as any).params.id)
    .catch(() => next("router"));

  if (!product) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "cant fined product" });
  }
  (res as any).product = product;

  next();
}
//what to do about stock
