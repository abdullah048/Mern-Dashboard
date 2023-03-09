/**
 * IMPORTS
 */

import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';

export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    const productsWithStat = await Promise.all(
      products.map(async function (product) {
        const stat = await ProductStat.findById(product._id);
        return {
          ...product.doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
