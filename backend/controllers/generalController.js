/**
 * IMPORTS
 */
import User from '../models/User.js';
import OverallStat from '../models/OverallStat.js';
import Transaction from '../models/Transaction.js';

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getDashboardStats(req, res) {
  try {
    /**
     * Hardcoded values
     */
    const currentMonth = 'November';
    const currentYear = 2021;
    const currentDay = '2021-11-15';

    /**
     * get recent 50 transactions
     */
    const transactions = await Transaction.find({})
      .limit(50)
      .sort({ createdOn: -1 });

    /**
     * overall stats
     */
    const overallStats = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStats[0];

    // current month stat
    const thisMonthStats = overallStats[0].monthlyData.find(function ({
      month,
    }) {
      return month == currentMonth;
    });

    // current day stat
    const currentDayStats = overallStats[0].dailyData.find(function ({
      date,
    }) {
      return date == currentDay;
    });
    console.log('total',currentDayStats)

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      currentDayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
