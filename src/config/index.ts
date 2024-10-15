import * as dotenv from 'dotenv';

dotenv.config();

class Config {
  public get mongoConnString(): string {
    return process.env.MONGO_CONN_STRING ?? '';
  }
}

export const config = new Config();
