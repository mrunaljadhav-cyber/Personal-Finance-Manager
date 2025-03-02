import { Router } from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const transaction = await Transaction.find({ user_id: req.user._id }).sort({ createdAt: -1 });
    res.json({ data: transaction });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { amount, description, date, category } = req.body;
      const transaction = new Transaction({
        amount,
        description,
        date,
        category,
        user_id: req.user._id,
      });
      await transaction.save();
      res.json({ message: "Success", transaction });
    } catch (error) {
      console.error('Transaction save error:', error);
      res.status(500).json({ message: "Failed to save transaction" });
    }
  }
);

export default router;  // Add default export