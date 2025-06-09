import app from '../src/app';
import { createServer } from 'http';

export default function handler(req: any, res: any) {
  const server = createServer(app);
  server.emit('request', req, res);
}
