require('dotenv').config({ path: './src/config/.env.local' });
import Server from './Server';
import * as Sequelize from 'sequelize';

const server = new Server();
server.listen();
