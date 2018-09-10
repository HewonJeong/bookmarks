require('dotenv').config({ path: './src/config/.env.local' });
import Server from './Server';

const server = new Server();
server.listen();
