import _ from 'lodash';
import { UUIDV4, STRING, TEXT, ENUM, Instance } from 'sequelize';
import db from '../';

export enum Provider {
  Facebook = 'facebook',
}
interface UserAttributes {
  id?: string;
  name: string;
  type: Provider;
  providerId: string;
  picture: string;
  archived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
type UserInstance = Instance<UserAttributes> & UserAttributes;
const User = db.define<UserInstance, UserAttributes>(
  'user',
  {
    id: {
      type: UUIDV4,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    type: {
      type: ENUM,
      values: _.values(Provider),
    },
    name: STRING,
    providerId: STRING,
    picture: TEXT,
  },
  { paranoid: true }
);

export default User;
