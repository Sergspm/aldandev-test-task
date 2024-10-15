import { Schema, model, Document } from 'mongoose';

interface IAction extends Document {
  trx_id: string;
  block_num: number;
  block_time: string;
}

const ActionSchema = new Schema<IAction>({
  trx_id: { type: String, unique: true, required: true },
  block_num: { type: Number, required: true },
  block_time: { type: String, required: true },
});

export const ActionModel = model<IAction>('Action', ActionSchema);
