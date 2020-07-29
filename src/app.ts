import dotenv from 'dotenv';
dotenv.config();
import { GraphQLServer } from 'graphql-yoga';
import { ContextParameters } from 'graphql-yoga/dist/types';
import logger from 'morgan';
import multer from 'multer';
import schema from './schema';
import './db';

const schema1: any = schema;
const server = new GraphQLServer({
  schema: schema1,
  context: (req: ContextParameters) => req,
});

const upload = multer({ dest: 'uploads/' });

server.express.use(logger('dev'));
server.express.post('/api/upload', upload.single('image'), (req: any, res: any) => {
  const {
    file: { path },
  } = req;
  res.json(path);
});

server.start({ port: 5000 }, () => console.log('✅ Server ON'));
