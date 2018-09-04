import { STRING } from 'sequelize';
import db from '../';

const User = db.define('user', {
  key: {
    type: STRING,
    primaryKey: true,
  },
  createdAt: STRING,
});

export default User;
