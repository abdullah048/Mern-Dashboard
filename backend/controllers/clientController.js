/**
 * IMPORTS
 */

import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import getCountryIso3 from 'country-iso-2-to-3';

export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    const productsWithStat = await Promise.all(
      products.map(async function (product) {
        const stat = await ProductStat.find({ productId: product._id });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getCustomers(req, res) {
  try {
    const customers = await User.find({ role: 'user' });
    if (customers && !customers.length) {
      return res.status(404).json({ message: 'There were no customers found' });
    }
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
export async function getTransactions(req, res) {
  try {
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;
    /**
     * sorting function
     * @returns numeric value based on sort value from client
     */
    function generateSort() {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1),
      };
      return sortFormatted;
    }
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    /**
     * search
     */
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    /**
     * Returns the total amount of documents
     * inside mono_db if user search something
     * then returns total pages which includes
     * that search option
     */
    const total = await Transaction.countDocuments({
      userId: { $regex: search, $options: 'i' },
      cost: { $regex: search, $options: 'i' },
    });

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    // console.log('users', users);
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});
    // console.log('mapped', mappedLocations);
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return {
          id: country,
          value: count,
        };
      }
    );
    // console.log('formatted', formattedLocations);
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
