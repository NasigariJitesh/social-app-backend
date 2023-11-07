import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { Db } from 'mongodb';

import { TokenResponse } from '../../user/user.model';

export interface Context extends StandaloneServerContextFunctionArgument {
  db: Db;
  user: TokenResponse | null;
}
