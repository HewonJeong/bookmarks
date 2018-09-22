import { UUIDV4, STRING, DATE, TEXT, ENUM } from 'sequelize';
import db from '../';

const User = db.define('user', {
  id: {
    type: UUIDV4,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: STRING,
  type: {
    type: ENUM,
    values: ['facebook'],
  },
  providerId: STRING,
  picture: TEXT,
});

export const createUser = (params: {
  type: string;
  name: string;
  picture: string;
  providerId: string;
}) =>
  User.create({
    id: undefined,
    ...params,
  });
export default User;
