import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

// Get all transactions grouped by month
export const index = async (req, res) => {
  try {
    const transactions = await Transaction.aggregate([
      { $match: { user_id: req.user._id } },
      {
        $group: {
          _id: { $month: "$date" },
          transactions: {
            $push: {
              amount: "$amount",
              description: "$description",
              date: "$date",
              _id: "$_id",
              category_id: "$category_id",
            },
          },
          totalExpenses: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json({ data: transactions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions", details: error.message });
  }
};

// Create a new transaction
export const create = async (req, res) => {
  try {
    const { amount, description, date, category_id } = req.body;

    // Validate category_id
    if (!category_id || !mongoose.Types.ObjectId.isValid(category_id)) {
      return res.status(400).json({ error: "Invalid or missing category_id" });
    }

    const transaction = new Transaction({
      amount,
      description,
      user_id: req.user._id,
      date,
      category_id: new mongoose.Types.ObjectId(category_id),
    });

    await transaction.save();
    res.status(201).json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction", details: error.message });
  }
};

// Delete a transaction
export const destroy = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await Transaction.deleteOne({ _id: req.params.id });
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction", details: error.message });
  }
};

// Update a transaction
export const update = async (req, res) => {
  try {
    const { category_id } = req.body;

    // Validate category_id if it's being updated
    if (category_id && !mongoose.Types.ObjectId.isValid(category_id)) {
      return res.status(400).json({ error: "Invalid category_id" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction updated successfully", transaction: updatedTransaction });
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction", details: error.message });
  }
};
