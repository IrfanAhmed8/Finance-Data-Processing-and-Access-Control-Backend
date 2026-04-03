import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },
  category: { type: String, required: true ,
    enum: ["salary", "investment", "food", "transportation", "entertainment", "utilities", "other"] 
  },
  date: { type: Date, default: Date.now },
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Record", recordSchema);