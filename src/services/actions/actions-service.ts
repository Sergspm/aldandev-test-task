import axios from 'axios';

import { ActionModel } from '../../models/action';
import { logger } from '../../utils/logger';

import { EActionAccount } from './response.types';
import type { TResponse, TAction } from './response.types';

export class ActionsService {
  public async refreshActions() {
    try {
      const response = await this.fetchActions(EActionAccount.EOSIO);

      const actions = response.data.actions || [];

      for (const action of actions) {
        await this.upsertAction(action);
      }

      logger.info('Actions fetched and stored successfully');
    } catch (error) {
      logger.error('Error fetching actions:', error);
    }
  }

  private async fetchActions(accountName: EActionAccount) {
    return axios.post<TResponse>(
      'https://eos.greymass.com/v1/history/get_actions',
      {
        account_name: accountName,
        pos: -1,
        offset: -100,
      }
    );
  }

  private async upsertAction(action: TAction) {
    const { trx_id, block_num, block_time } = action.action_trace;

    await ActionModel.updateOne(
      { trx_id },
      { trx_id, block_num, block_time },
      { upsert: true }
    );
  }
}
