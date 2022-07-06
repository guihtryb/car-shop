import { Schema } from 'mongoose';
import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().positive().int(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;

export const vehicleMongooseSchema = new Schema<Vehicle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
});
