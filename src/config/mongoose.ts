import { ConnectionOptions } from 'mongoose';

const uris = String(process.env.MONGO_URI);

const connectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
} as ConnectionOptions;

export { uris, connectionOptions };
