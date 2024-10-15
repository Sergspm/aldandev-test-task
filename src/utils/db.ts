import mongoose from 'mongoose';

import { logger } from './logger';
import { config } from '../config';

export const connect = async () => {
  await mongoose.connect(config.mongoConnString, { autoIndex: true });

  logger.info('Connected to MongoDB');
};
