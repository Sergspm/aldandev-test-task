export enum EActionAccount {
  EOSIO = 'eosio',
}

enum EActionPermission {
  ACTIVE = 'active',
}

type TActionAccountRamDelta = {
  account: EActionAccount;
  delta: number;
};

type TActionTraceActAuthorization = {
  actor: EActionAccount;
  permission: EActionPermission;
};

type TActionTraceAct = {
  account: EActionAccount;
  authorization: TActionTraceActAuthorization[];
  data: null;
  hex_data: string;
  name: string;
};

type TActionTraceReceipt = {
  abi_sequence: number;
  act_digest: string;
  auth_sequence: [EActionAccount, number][];
  code_sequence: number;
  global_sequence: number;
  receiver: EActionAccount;
  recv_sequence: number;
};

type TActionTrace = {
  account_ram_deltas: TActionAccountRamDelta[];
  act: TActionTraceAct;
  action_ordinal: number;
  block_num: number;
  block_time: string;
  closest_unnotified_ancestor_action_ordinal: number;
  context_free: boolean;
  creator_action_ordinal: number;
  elapsed: number;
  producer_block_id: string;
  receipt: TActionTraceReceipt;
  receiver: EActionAccount;
  trx_id: string;
};

export type TAction = {
  account_action_seq: number;
  action_trace: TActionTrace;
  block_num: number;
  block_time: string;
  global_action_seq: number;
  irreversible: boolean;
};

export type TResponse = {
  actions: TAction[];
  head_block_num: number;
  last_irreversible_block: number;
};
