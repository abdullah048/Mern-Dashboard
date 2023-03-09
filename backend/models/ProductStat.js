import mongoose from 'mongoose';

const productStatSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    Year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: {
      date: String,
      totalSales: Number,
      totalUnits: Number,
    },
    supply: Number,
  },
  {
    timestamps: true,
  }
);

const ProductStat = mongoose.model('ProductStat', productStatSchema);

export default ProductStat;
