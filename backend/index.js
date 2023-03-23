// Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/clientRoute.js';
import generalRoutes from './routes/generalRoute.js';
import managementRoutes from './routes/managementRoute.js';
import salesRoutes from './routes/salesRoute.js';

/**
 * DATA IMPORTS
 */
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverviewStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from './data/index.js';

/**
 * CONFIGURATIONS
 */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/**
 * ROUTES
 */

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/**
 * MONGOOSE SETUP
 */
mongoose.set('strictQuery', false);
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    app.listen(PORT, function () {
      console.log('Connected to mongo_db on port :' + PORT);
      /**
       * ONLY ADD DATA ONE TIME
       */
      // User.insertMany(dataUser);
      // Product.insertMany(dataProduct);
      // Transaction.insertMany(dataTransaction);
      // ProductStat.insertMany(dataProductStat);
      // OverviewStat.insertMany(dataOverallStat);
      // AffiliateStat.insertMany(dataAffiliateStat);
    });
  })
  .catch(function (error) {
    console.log('Error while connecting to mongo_db : ', error);
  });
