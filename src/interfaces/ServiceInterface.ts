import { ZodError } from 'zod';

export interface ServiceError {
  error: ZodError | string;
}

export interface Service<T> {
  create(payload: T): Promise<T | ServiceError | null>;
  read(): Promise<T[]>;
  readOne(_id: string): Promise<T | ServiceError | null>;
  update(_id: string, payload: T): Promise<T | ServiceError | null>;
  delete(_id: string): Promise<T | ServiceError | null>;
}