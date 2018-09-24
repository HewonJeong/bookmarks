// @flow
import Sequelize from 'sequelize';

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_SOCKET,
  NODE_ENV,
} = process.env;

const db: Sequelize.Sequelize = new Sequelize(
  'bookmarks',
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT),
    logging: false,
    dialect: 'mysql',
    dialectOptions: {
      socketPath: DATABASE_SOCKET,
    },
    paranoid: true,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default db;
