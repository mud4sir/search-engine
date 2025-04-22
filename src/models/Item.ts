import { Schema, model } from "mongoose";
import { Item } from "@/types";

const itemSchema = new Schema<Item>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

itemSchema.index({ name: "text", description: "text" });
itemSchema.index({ category: 1 });
itemSchema.index({ price: 1 });
itemSchema.index({ createdAt: 1 });

export const ItemModel = model<Item>("Item", itemSchema);
