import { NextFunction, Router } from "express";
import { Request, Response } from "express-serve-static-core";
import ProductsModel, { productsModel } from "../models/products";
import * as HttpStatus from "http-status-codes";

export const productsRouter = Router();

interface productRequest extends Request {
  product?: ProductsModel;
}

productsRouter.get(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productsModel.find().catch((err) => next(err));
    res.send(products);
  }
);
productsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const newProduct: ProductsModel | void = await productsModel
      .create({
        name: req.body.name,
        price: req.body.price,
        amountInStock: req.body.amountInStock,
        image: req.body.image,
      })
      .catch((err) => next(err));

    res.status(HttpStatus.CREATED).json(newProduct);
  }
);

productsRouter
  .route("/:id")
  .get((req: productRequest, res: Response) => {
    res.send(req.product);
    req.params.id;
  })
  .patch(async (req: productRequest, res: Response, next: NextFunction) => {
    Object.assign(req.product, req.body);
    const updatedProduct: ProductsModel | void = await req.product
      .save()
      .catch((err) => next(err));
    res.json(updatedProduct);
  })
  .delete(async (req: productRequest, res: Response, next: NextFunction) => {
    await req.product.remove().catch((err) => next(err));
    res.json({ mesage: "deleted product" });
  });

productsRouter.param("id", async (req: productRequest, res, next, id) => {
  const product: ProductsModel | void = await productsModel
    .findById(id)
    .catch(() => next("router"));

  if (!product) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "cant fined product" });
  }
  req.product = product;

  next();
});

//what to do about stock
