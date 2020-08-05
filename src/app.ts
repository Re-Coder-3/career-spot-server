import dotenv from 'dotenv';
dotenv.config();
import { GraphQLServer } from 'graphql-yoga';
import { ContextParameters } from 'graphql-yoga/dist/types';
import logger from 'morgan';
import helmet from 'helmet';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import schema from './schema';
import './db';

const schema1: any = schema;
const server = new GraphQLServer({
  schema: schema1,
  context: (req: ContextParameters) => req,
});

const gc = new Storage({
  keyFilename: path.join(__dirname, '../career-spot-9a8d6f0b901f.json'),
  projectId: 'career-spot',
});

gc.getBuckets().then((x) => console.log(x));

export const ehddnrFileBucket = gc.bucket('career-spot');

server.express.use(logger('dev'));
server.express.use(helmet());

server.start({ port: 5000 }, () => console.log('✅ Server ON'));
