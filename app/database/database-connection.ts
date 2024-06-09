import { connect, disconnect } from 'mongoose';
import EnvHelper from '../config/env.helper';

export const connectToDatabase = async () => {
  return connect(EnvHelper.getDatabase(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};
export const disconnectFromDB = () => {
  return disconnect();
};
