import dotenv from 'dotenv';
dotenv.config();
import { GraphQLServer } from 'graphql-yoga';
import { ContextParameters } from 'graphql-yoga/dist/types';
import logger from 'morgan';
import helmet from 'helmet';
import schema from './schema';
import './db';

const schema1: any = schema;
const server = new GraphQLServer({
  schema: schema1,
  context: (req: ContextParameters) => req,
});

server.express.use(logger('dev'));
server.express.use(helmet());

server.start({ port: 5000 }, () => console.log('✅ Server ON'));
