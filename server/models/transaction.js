import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  category: {
    _id: String,
    label: String,
    icon: String
  },
  user_id: mongoose.Types.ObjectId,
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);