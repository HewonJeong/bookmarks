// @flow
import Sequelize from 'sequelize';
import { concatSeries } from 'async';
import mysql from 'mysql2';

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  NODE_ENV,
} = process.env;

const db: Sequelize.Sequelize = new Sequelize(
  'bookmarks',
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT),
    dialect: 'mysql',
    logging: NODE_ENV === 'development',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
  }
);

export default db;
