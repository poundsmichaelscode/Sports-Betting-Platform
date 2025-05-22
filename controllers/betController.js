
const Wallet = require('../models/Wallet');
const Bet = require('../models/Bet');

exports.placeBet = async (req, res) => {
  const { userId, gameId, stake } = req.body;

  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet || wallet.balance < stake) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    wallet.balance -= stake;
    await wallet.save();

    const bet = new Bet({ userId, gameId, stake });
    await bet.save();

    res.status(201).json({ message: 'Bet placed successfully', bet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
