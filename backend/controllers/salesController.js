import OverviewStat from '../models/OverallStat.js'

export const getSales = async (req,res) => {
    try {
        const overallStat = await OverviewStat.find();
        res.status(200).json(overallStat[0]);
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}
