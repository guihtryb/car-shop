import { Schema } from 'mongoose';
import { z } from 'zod';
import { Vehicle, VehicleSchema } from './VehicleInterface';

export const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export interface Car extends z.infer<typeof CarSchema>, Vehicle { }

export const carMongooseSchema = new Schema<Car>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });
