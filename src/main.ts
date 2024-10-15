import cron from 'node-cron';

import { ActionsService } from './services/actions/actions-service';
import { logger } from './utils/logger';
import { connect as dbConnect } from './utils/db';

async function main() {
  try {
    await dbConnect();

    logger.info('Connected to MongoDB');

    const service = new ActionsService();

    cron.schedule('* * * * *', () => {
      logger.info('Running scheduled fetch of actions...');

      service.refreshActions();
    });
  } catch (error) {
    logger.error('Error starting cron job:', error);
  }
}

main();
