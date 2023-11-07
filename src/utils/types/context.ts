import { Db } from 'mongodb';

import { TokenResponse } from '../../user/user.model';

export interface Context {
  db: Db;
  user: TokenResponse | null;
}
