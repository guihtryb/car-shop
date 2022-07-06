import { Schema } from 'mongoose';
import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

const CarSchema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export interface Car extends z.infer<typeof CarSchema>, Vehicle { }

export const carMongooseSchema = new Schema<Car>({
  doorsQty: Number,
  seatsQty: Number,
});
